import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          padding: "40px 32px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <img
            src="https://img.icons8.com/color/96/000000/shopping-cart.png"
            alt="ShopEase Logo"
            style={{ width: "64px", marginBottom: "8px" }}
          />
          <h2 style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#6366f1",
            margin: 0,
          }}>Welcome Back!</h2>
          <p style={{
            color: "#64748b",
            fontSize: "1rem",
            marginTop: "8px",
            marginBottom: 0,
          }}>Login to your ShopEase account</p>
        </div>
        {error && (
          <p style={{
            color: "#ef4444",
            background: "#fee2e2",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "16px",
            fontWeight: 500,
          }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "10px",
              border: "1px solid #c7d2fe",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "10px",
              border: "1px solid #c7d2fe",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
              color: "white",
              fontWeight: 600,
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.15)",
              cursor: "pointer",
              marginTop: "16px",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: "24px", color: "#64748b", fontSize: "0.95rem" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#6366f1",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
