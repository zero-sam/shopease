import { useState, useEffect } from 'react';
import ProductCard from '../../components/products/ProductCard';
import api from '../../services/api';
import '../../styles/responsive.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        
        // Extract unique categories
        const allCategories = response.data.map(product => product.category);
        const uniqueCategories = [...new Set(allCategories)].filter(cat => cat);
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = category === '' || product.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-low') {
      return b.price - a.price;
    } else if (sortBy === 'name-a-z') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-z-a') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  
  return (
    <div className="container" style={{ 
      padding: 'clamp(20px, 5vw, 40px) 15px', 
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        textAlign: 'center',
        marginBottom: 'clamp(20px, 5vw, 40px)',
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        fontWeight: '700',
        color: '#1a202c'
      }}>
        All Products
      </h1>
      
      {/* Filter and Search Controls */}
      <div style={{ 
        marginBottom: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '16px',
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: 'white',
              fontSize: '16px',
              minWidth: '150px',
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: 'white',
              fontSize: '16px',
              minWidth: '150px',
            }}
          >
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div style={{ 
          textAlign: 'center',
          padding: '50px 20px',
          fontSize: '18px',
          color: '#718096'
        }}>
          Loading products...
        </div>
      ) : sortedProducts.length === 0 ? (
        <div style={{ 
          textAlign: 'center',
          padding: '50px 20px',
          fontSize: '18px',
          color: '#718096'
        }}>
          No products found. Try a different search or category.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px',
        }} className="products-grid">
          {sortedProducts.map(product => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}