import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicProducts } from "../../services/productService";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProducts()
      .then(res => {
        setProducts(res.data.products); // matches productController.getProducts response
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {products.map(prod => (
            <div key={prod._id} style={{ border: "1px solid #ccc", padding: "15px" }}>
              {prod.images?.length > 0 && (
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
              )}
              <h3>{prod.name}</h3>
              <p>₹{prod.price}</p>
              <p>{prod.description}</p>
              <Link to={`/products/${prod._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
