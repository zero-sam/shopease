import { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Cancellation reason options
  const cancelReasons = [
    "Changed my mind",
    "Found a better price elsewhere",
    "Ordered by mistake",
    "Delivery time too long",
    "Other"
  ];

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      setError("Please log in to view your orders");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Fetch orders
    api.get("/orders")
      .then((response) => {
        // Ensure orders is always an array
        const orderData = Array.isArray(response.data) ? response.data : 
                         (response.data.orders ? response.data.orders : []);
        console.log("Orders received:", orderData);
        
        // Force orders to be an array to prevent "map is not a function" error
        setOrders(Array.isArray(orderData) ? orderData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, [user, navigate]);

  const openCancelModal = (orderId) => {
    setCancelOrderId(orderId);
    setCancelReason(cancelReasons[0]);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelOrderId(null);
    setCancelReason("");
  };

  const handleCancelOrder = async () => {
    if (!cancelOrderId || !cancelReason) return;
    
    try {
      console.log("Attempting to cancel order:", cancelOrderId);
      console.log("With reason:", cancelReason);
      
      const response = await api.put(`/orders/${cancelOrderId}/cancel`, { 
        cancelReason: cancelReason 
      });
      
      console.log("Cancel order response:", response.data);
      
      // After successful cancellation, reload the orders to get fresh data
      api.get("/orders")
        .then((response) => {
          const orderData = Array.isArray(response.data) ? response.data : 
                           (response.data.orders ? response.data.orders : []);
          setOrders(Array.isArray(orderData) ? orderData : []);
        })
        .catch((err) => {
          console.error("Error reloading orders:", err);
        });
      
      closeCancelModal();
    } catch (err) {
      console.error("Error cancelling order:", err.response?.data || err.message);
      setError(`Failed to cancel order: ${err.response?.data?.message || "Please try again."}`);
    }
  };

  // Modal style
  const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0,0,0,0.5)",
    display: showCancelModal ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  };

  const modalContentStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  };

  const selectStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #b82d2dff",
    fontSize: "16px"
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px",
      background: "linear-gradient(135deg, #f8ffae 0%, #f8f9fa 100%)",
      minHeight: "100vh"
    }}>
      <h1 style={{
        fontSize: "32px",
        fontWeight: "bold",
        color: "#2980b9",
        textAlign: "center",
        marginBottom: "40px"
      }}>My Orders</h1>

      {error && (
        <div style={{
          background: "#ffebee",
          color: "#c62828",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading orders...</div>
      ) : !Array.isArray(orders) || orders.length === 0 ? (
        <div style={{ 
          background: "#000000ff", 
          padding: "30px", 
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ color: "#666" }}>You have no orders yet</h3>
          <p style={{ marginTop: "10px" }}>
            Browse products and place your first order!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {/* Extra check to ensure orders is an array before mapping */}
          {Array.isArray(orders) && orders.map((order) => (
            <div key={order._id} style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              overflow: "hidden"
            }}>
              {/* Order Header */}
              <div style={{
                padding: "16px",
                borderBottom: "1px solid #7a2727ff",
                background: "#f8f9fa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    Order ID: <span style={{ fontWeight: "bold" }}>{order._id}</span>
                  </div>
                  <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: order.status === "Processing" ? "#2980b9" :
                         order.status === "Shipped" ? "#27ae60" :
                         order.status === "Delivered" ? "#2ecc71" :
                         order.status === "Cancelled" ? "#e74c3c" : "#f39c12",
                  background: order.status === "Processing" ? "#ebf5fb" :
                              order.status === "Shipped" ? "#eafaf1" :
                              order.status === "Delivered" ? "#d5f5e3" :
                              order.status === "Cancelled" ? "#fdedec" : "#fef9e7"
                }}>
                  {order.status || "Processing"}
                </div>
              </div>
              
              {/* Order Items */}
              <div style={{ padding: "16px" }}>
                {order.items && order.items.map((item, index) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: index < order.items.length - 1 ? "1px solid #6f1616ff" : "none"
                  }}>
                    <div style={{ width: "70px", marginRight: "16px" }}>
                      {item.product && item.product.images && item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px"
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "70px",
                          height: "70px",
                          background: "#f1f1f1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#801010ff",
                          borderRadius: "8px"
                        }}>
                          No Image
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold",color:"#184cabff", marginBottom: "6px" }}>
                        {item.product ? item.product.name : "Product Unavailable"}
                      </div>
                      <div style={{ fontSize: "14px", color: "#3d1414ff" }}>
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: "bold", color: "#2980b9", fontSize: "16px" }}>
                      ₹{item.product ? item.product.price : 0}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Footer */}
              <div style={{ 
                padding: "16px", 
                borderTop: "1px solid #602323ff",
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f8f9fa"
              }}>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Total: ₹{order.totalAmount}
                </div>
                
                {(!order.status || order.status === "Processing") && (
                  <button 
                    onClick={() => openCancelModal(order._id)}
                    style={{
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    Cancel Order
                  </button>
                )}
                
                {order.status === "Cancelled" && order.cancelReason && (
                  <div style={{ color: "#e74c3c", fontSize: "14px" }}>
                    Reason: {order.cancelReason}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Order Modal */}
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Cancel Order</h3>
          <p>Please select a reason for cancellation:</p>
          
          <select 
            value={cancelReason} 
            onChange={(e) => setCancelReason(e.target.value)}
            style={selectStyle}
          >
            {cancelReasons.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              onClick={closeCancelModal}
              style={{
                padding: "10px 16px",
                background: "#f1f1f1",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleCancelOrder}
              style={{
                padding: "10px 16px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
