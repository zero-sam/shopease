import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { CartContext } from "../../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        color: "#555"
      }}>
        <span className="loader"></span>
        Loading product details...
      </div>
    );
  if (!product)
    return (
      <div style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        color: "#d32f2f"
      }}>
        Product not found.
      </div>
    );

  return (
    <div style={{
      maxWidth: "900px",
      margin: "40px auto",
      background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
      borderRadius: "24px",
      boxShadow: "0 8px 32px rgba(60,72,88,0.12)",
      padding: "40px",
      display: "flex",
      gap: "40px",
      alignItems: "flex-start",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <div style={{ flex: "0 0 340px", textAlign: "center" }}>
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: "320px",
              height: "320px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 4px 24px rgba(60,72,88,0.10)"
            }}
          />
        ) : (
          <div style={{
            width: "320px",
            height: "320px",
            background: "#e0e7ff",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#888",
            fontSize: "2rem"
          }}>
            No Image
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{
          fontSize: "2.5rem",
          marginBottom: "12px",
          color: "#2d3748",
          fontWeight: 700,
          letterSpacing: "0.5px"
        }}>{product.name}</h2>
        <p style={{
          fontSize: "1.3rem",
          color: "#6366f1",
          fontWeight: 600,
          marginBottom: "18px"
        }}>
          ₹{product.price}
        </p>
        <p style={{
          fontSize: "1.1rem",
          color: "#374151",
          marginBottom: "18px"
        }}>
          {product.description}
        </p>
        <p style={{
          fontSize: "1rem",
          color: product.inventory > 0 ? "#059669" : "#d32f2f",
          fontWeight: 500,
          marginBottom: "24px"
        }}>
          <strong>Stock:</strong> {product.inventory ?? "N/A"}
        </p>
        <button
          onClick={() => addToCart(product)}
          style={{
            background: "linear-gradient(90deg, #6366f1 60%, #818cf8 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "16px 36px",
            fontSize: "1.2rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(99,102,241,0.10)",
            transition: "transform 0.1s, box-shadow 0.1s"
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.18)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(99,102,241,0.10)";
          }}
        >
          Add to Cart
        </button>
      </div>
      <style>{`
        .loader {
          border: 4px solid #e0e7ff;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 1s linear infinite;
          margin-right: 16px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
