import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Debug log to verify cart items
    console.log("Cart page loaded with items:", cartItems);
  }, [cartItems]);

  const handleProceedToCheckout = () => {
    // Debug check
    console.log("Proceeding to checkout with items:", cartItems);
    
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add some products first.");
      return;
    }
    
    // Store cart items in sessionStorage as backup
    sessionStorage.setItem("checkoutCart", JSON.stringify(cartItems));
    
    // Navigate to checkout
    navigate("/buyer/checkout");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <div
      style={{
        padding: "40px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(60, 72, 88, 0.15)",
          padding: "32px 24px"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#4f46e5",
            marginBottom: "30px",
            letterSpacing: "1px"
          }}
        >
          🛒 My Cart
        </h2>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "1.2rem" }}>
            Your cart is empty
          </p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cartItems.map(item => (
                <li
                  key={item._id}
                  style={{
                    marginBottom: "20px",
                    borderRadius: "12px",
                    border: "1px solid #e0e7ff",
                    boxShadow: "0 2px 8px rgba(60, 72, 88, 0.07)",
                    padding: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "box-shadow 0.2s"
                  }}
                >
                  <div>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", color: "#334155" }}>
                      {item.name}
                    </h4>
                    <p style={{ margin: "0 0 6px 0", color: "#6366f1", fontWeight: "500" }}>
                      Price: ₹{item.price}
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ color: "#64748b", fontWeight: "500" }}>Quantity:</span>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                        style={{
                          width: "60px",
                          marginLeft: "12px",
                          padding: "6px",
                          borderRadius: "6px",
                          border: "1px solid #c7d2fe",
                          fontSize: "1rem"
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: "linear-gradient(90deg, #f43f5e 0%, #f59e42 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 18px",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(244,63,94,0.08)",
                      transition: "background 0.2s"
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "30px",
                marginBottom: "18px"
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#4f46e5",
                  fontWeight: "700",
                  margin: 0
                }}
              >
                Total: ₹{totalPrice}
              </h3>
              <button
                onClick={clearCart}
                style={{
                  background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginRight: "10px",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
                  transition: "background 0.2s"
                }}
              >
                Clear Cart
              </button>
            </div>
            <button
              onClick={handleProceedToCheckout}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #22d3ee 0%, #818cf8 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "16px 0",
                fontWeight: "700",
                fontSize: "1.15rem",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(34,211,238,0.10)",
                transition: "background 0.2s"
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
