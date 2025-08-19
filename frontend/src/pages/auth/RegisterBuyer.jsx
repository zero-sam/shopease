import { useState } from "react";
import { registerBuyer } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterBuyer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerBuyer(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(60, 72, 88, 0.15)",
          padding: "40px 32px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center"
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <img
            src="https://img.icons8.com/color/96/000000/shopping-cart.png"
            alt="ShopEase Logo"
            style={{ marginBottom: 8 }}
          />
          <h2 style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#6366f1",
            marginBottom: 8,
            letterSpacing: "1px"
          }}>
            Register as Buyer
          </h2>
          <p style={{ color: "#64748b", fontSize: "1rem", marginBottom: 0 }}>
            Join ShopEase and start shopping smarter!
          </p>
        </div>
        {error && (
          <p style={{
            color: "#ef4444",
            background: "#fee2e2",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "16px"
          }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.15)",
              transition: "background 0.2s"
            }}
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: "18px", fontSize: "0.95rem", color: "#64748b" }}>
          Already have an account?{" "}
          <span
            style={{
              color: "#6366f1",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "underline"
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
