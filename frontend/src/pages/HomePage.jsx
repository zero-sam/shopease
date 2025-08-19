import { useEffect, useState, useContext } from "react";
import { getPublicProducts } from "../services/productService";
import ProductList from "../components/products/ProductList";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Add a fun animated background and more vibrant styles
const gradientBg = {
  minHeight: "100vh",
  background: "linear-gradient(120deg, #f0f4f8 0%, #eaf6fb 100%)",
  position: "relative",
  overflow: "hidden"
};

const animatedShapes = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 0
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPublicProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div style={gradientBg}>
      {/* Animated SVG shapes for background */}
      <svg style={animatedShapes}>
        <circle cx="10%" cy="20%" r="80" fill="#aee9f7" opacity="0.25">
          <animate attributeName="cy" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="90%" cy="80%" r="60" fill="#b8e994" opacity="0.18">
          <animate attributeName="cx" values="90%;60%;90%" dur="10s" repeatCount="indefinite" />
        </circle>
        <rect x="70%" y="10%" width="120" height="120" rx="40" fill="#f6e58d" opacity="0.15">
          <animate attributeName="y" values="10%;60%;10%" dur="12s" repeatCount="indefinite" />
        </rect>
      </svg>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 48,
            padding: "48px 0 40px 0",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 32,
            boxShadow: "0 12px 48px rgba(44,62,80,0.13)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Sparkle effect */}
          <svg style={{ position: "absolute", top: 12, right: 32, width: 60, height: 60, zIndex: 2 }}>
            <g>
              <circle cx="30" cy="30" r="8" fill="#f9ca24" opacity="0.7">
                <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="10" cy="10" r="4" fill="#f6e58d" opacity="0.5">
                <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
          <h1
            style={{
              fontSize: "3.6rem",
              color: "#2980b9",
              marginBottom: 18,
              fontWeight: 900,
              letterSpacing: "2.5px",
              textShadow: "0 4px 16px #eaf6fb"
            }}
          >
            <span style={{ background: "linear-gradient(90deg,#27ae60,#2980b9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Welcome to ShopEase
            </span>
          </h1>
          <p
            style={{
              color: "#555",
              fontSize: "1.5rem",
              marginBottom: 0,
              fontWeight: 600,
              letterSpacing: "1.2px"
            }}
          >
            Discover unique products from local and small businesses.<br />
            <span style={{ color: "#27ae60", fontWeight: 700 }}>Shop. Support. Smile.</span>
          </p>
          {/* My Orders Button */}
          <button
            onClick={() => navigate("/buyer/orders")}
            style={{
              marginTop: "32px",
              padding: "14px 40px",
              background: "linear-gradient(90deg,#27ae60,#2980b9)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(44,62,80,0.13)",
              transition: "transform 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.07)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            My Orders
          </button>
        </div>
        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.4rem", color: "#2980b9", marginTop: 40 }}>
            <span role="img" aria-label="sparkle">✨</span> Loading products...
          </p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center", fontSize: "1.3rem", marginTop: 40 }}>{error}</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", fontSize: "1.3rem", marginTop: 40 }}>
            No products available right now. Please check back soon!
          </p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "40px",
            marginTop: "32px",
            animation: "fadeIn 1.2s"
          }}>
            <ProductList products={products} />
          </div>
        )}
        {/* Floating Cart Button */}
        <button
          onClick={() => navigate("/cart")}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            background: "linear-gradient(135deg,#27ae60,#2980b9)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            boxShadow: "0 12px 32px rgba(44,62,80,0.22)",
            fontSize: "2.3rem",
            cursor: "pointer",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s",
          }}
          title="View Cart"
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          🛒
          {cartItems.length > 0 && (
            <span style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "#e74c3c",
              color: "#fff",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(44,62,80,0.18)"
            }}>{cartItems.length}</span>
          )}
        </button>
      </div>
      {/* Keyframes for fadeIn animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}