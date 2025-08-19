import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import api from "../../services/api";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [localCartItems, setLocalCartItems] = useState([]);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize local cart from context or sessionStorage
  useEffect(() => {
    console.log("Checkout page loaded with context cartItems:", cartItems);
    
    if (cartItems && cartItems.length > 0) {
      setLocalCartItems(cartItems);
    } else {
      // Try to retrieve from sessionStorage
      const backupCart = sessionStorage.getItem("checkoutCart");
      if (backupCart) {
        const parsedCart = JSON.parse(backupCart);
        console.log("Retrieved cart from sessionStorage:", parsedCart);
        setLocalCartItems(parsedCart);
      }
    }
  }, [cartItems]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const itemsToOrder = localCartItems.length > 0 ? localCartItems : cartItems;
    console.log("Attempting checkout with items:", itemsToOrder);
    
    if (!itemsToOrder || itemsToOrder.length === 0) {
      setError("Your cart is empty. Please add products before checkout.");
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        items: itemsToOrder.map(item => ({
          product: item._id,
          quantity: item.quantity || 1
        })),
        shippingAddress: {
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          postalCode: address.postalCode
        }
      };
      
      console.log("Sending order data:", orderData);
      
      const response = await api.post("/orders", orderData);
      console.log("Order created successfully:", response.data);
      
      // Clear both carts
      clearCart();
      sessionStorage.removeItem("checkoutCart");
      
      navigate("/buyer/orders");
      
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to place order. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          borderRadius: "20px",
          padding: "40px 32px",
          maxWidth: 480,
          width: "100%",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -32,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #43c6ac 0%, #191654 100%)",
            borderRadius: "50%",
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(67,198,172,0.2)"
          }}
        >
          <span style={{ fontSize: 32, color: "#fff" }}>🛒</span>
        </div>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            marginTop: 40,
            fontWeight: 700,
            fontSize: 28,
            color: "#191654",
            letterSpacing: 1
          }}
        >
          Checkout
        </h2>
        <form
          onSubmit={handleCheckout}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontWeight: 500, color: "#43c6ac" }}>
              Street
              <input
                name="street"
                value={address.street}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  marginTop: 4,
                  fontSize: 16
                }}
                placeholder="123 Main St"
              />
            </label>
            <label style={{ fontWeight: 500, color: "#43c6ac" }}>
              City
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  marginTop: 4,
                  fontSize: 16
                }}
                placeholder="Your City"
              />
            </label>
            <label style={{ fontWeight: 500, color: "#43c6ac" }}>
              State
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  marginTop: 4,
                  fontSize: 16
                }}
                placeholder="State/Province"
              />
            </label>
            <label style={{ fontWeight: 500, color: "#43c6ac" }}>
              Country
              <input
                name="country"
                value={address.country}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  marginTop: 4,
                  fontSize: 16
                }}
                placeholder="Country"
              />
            </label>
            <label style={{ fontWeight: 500, color: "#43c6ac" }}>
              Postal Code
              <input
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  marginTop: 4,
                  fontSize: 16
                }}
                placeholder="Postal Code"
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              padding: "14px",
              background: "linear-gradient(135deg, #43c6ac 0%, #191654 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: 18,
              boxShadow: "0 2px 8px rgba(67,198,172,0.15)",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
          {error && (
            <p style={{ color: "#e74c3c", textAlign: "center", fontWeight: 500 }}>
              {error}
            </p>
          )}
        </form>
        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            color: "#888",
            fontSize: 15
          }}
        >
          <span>Secure Payment <span style={{ color: "#43c6ac" }}>✔️</span></span>
        </div>
      </div>
    </div>
  );
}
