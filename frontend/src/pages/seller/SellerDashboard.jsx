import { useEffect, useState } from "react";
import api from "../../services/api";


const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "8px",
  fontSize: "1em",
  width: "100%",
  boxSizing: "border-box"
};
const cardStyle = {
  marginBottom: "20px",
  border: "1px solid #e1e4e8",
  borderRadius: "12px",
  padding: "18px",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(44,62,80,0.07)"
};
const buttonStyle = {
  padding: "10px 18px",
  background: "#2980b9",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "12px"
};

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category:"",
    images:[""],
    inventory: 0,
    isActive: true
  });

  // Track edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    category:"",
    images:[""],
    inventory: 0,
    isActive: true

  });

  const fetchProducts = () => {
    api.get("/products/my-products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangeNew = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleChangeEdit = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    api.post("/products", newProduct)
      .then(() => {
        setNewProduct({ name: "", price: "", description: "", inventory: 0, category:"", images:[""], isActive: true });
        fetchProducts();
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api.delete(`/products/${productId}`)
        .then(() => fetchProducts())
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock 
      
    });
  };

  const handleUpdateProduct = (productId) => {
    api.put(`/products/${productId}`, editForm)
      .then(() => {
        setEditingId(null);
        fetchProducts();
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  if (loading) return <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#2980b9" }}>Loading dashboard...</p>;

  return (
    <div style={{
      padding: "32px 0",
      background: "linear-gradient(135deg, #eaf6fb 0%, #f8f9fa 100%)",
      minHeight: "100vh"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{
          fontSize: "2.2rem",
          color: "#2980b9",
          marginBottom: 24,
          fontWeight: 700,
          letterSpacing: "1px",
          textAlign: "center"
        }}>Seller Dashboard</h1>

        {/* Add Product Form */}
        <section style={{
          marginBottom: "30px",
          background: "#f8f9fa",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(44,62,80,0.07)"
        }}>
          <h2 style={{ marginBottom: 16, color: "#2c3e50" }}>Add New Product</h2>
          <form onSubmit={handleAddProduct} style={{ display: "grid", gap: "10px", maxWidth: "500px", margin: "0 auto" }}>
            <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChangeNew} required style={inputStyle} />
            <input name="price" placeholder="Price" type="number" value={newProduct.price} onChange={handleChangeNew} required style={inputStyle} />
            <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChangeNew} required style={inputStyle} />
            <input name="category" placeholder="Category" value={newProduct.category} onChange={handleChangeNew} style={inputStyle} />
            <input name="images" placeholder="Image URLs (comma-separated)" value={newProduct.images} onChange={handleChangeNew} style={inputStyle} />
            <input name="inventory" placeholder="Stock Quantity" value={newProduct.inventory} onChange={handleChangeNew} required style={inputStyle} />
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input name="isActive" type="checkbox" checked={newProduct.isActive} onChange={handleChangeNew} />
              Active
            </label>
            <button type="submit" style={buttonStyle}>Add Product</button>
          </form>
        </section>

        {/* Product List With Inline Edit */}
        <section>
          <h2 style={{ marginBottom: 16, color: "#2c3e50" }}>My Products</h2>
          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", fontSize: "1.1rem" }}>No products yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {products.map((p) => (
                <li key={p._id} style={cardStyle}>
                  {editingId === p._id ? (
                    <>
                      <input name="name" value={editForm.name} onChange={handleChangeEdit} style={inputStyle} />
                      <input name="price" type="number" value={editForm.price} onChange={handleChangeEdit} style={inputStyle} />
                      <textarea name="description" value={editForm.description} onChange={handleChangeEdit} style={inputStyle} />
                      <input name="inventory" type="number" placeholder="Stock Quantity" value={editForm.inventory} onChange={handleChangeEdit} style={inputStyle} />
                      <input name="images" type="text" placeholder="Image URLs (comma-separated)" value={editForm.images} onChange={handleChangeEdit} style={inputStyle} />
                      <input name="category" type="text" placeholder="Category" value={editForm.category} onChange={handleChangeEdit} style={inputStyle} />
                      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input name="isActive" type="checkbox" checked={editForm.isActive} onChange={handleChangeEdit} />
                        Active
                      </label>
                      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                        <button onClick={() => handleUpdateProduct(p._id)} style={buttonStyle}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{ ...buttonStyle, background: "#bbb" }}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <strong style={{ fontSize: "1.1rem", color: "#2980b9" }}>{p.name}</strong>
                      <span style={{ color: "#27ae60", fontWeight: "bold" }}>₹{p.price}</span>
                      <span style={{ color: "#555" }}>Stock: {p.inventory}</span>
                      <span style={{ color: "#888" }}>{p.category}</span>
                      <span style={{ color: p.isActive ? "#27ae60" : "#e74c3c" }}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                      <p style={{ margin: "8px 0", color: "#444" }}>{p.description}</p>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={() => handleEditClick(p)} style={buttonStyle}>Edit</button>
                        <button onClick={() => handleDelete(p._id)} style={{ ...buttonStyle, background: "#e74c3c" }}>Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}