import { useState } from "react";
import { registerSeller } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterSeller() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    businessDescription: "",
    businessAddress: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: ""
    },
    businessLicense: "",
    taxId: "",
    bankDetails: {
      accountNumber: "",
      bankName: "",
      ifsc: ""
    }
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested fields for businessAddress and bankDetails
    if (name.startsWith("businessAddress.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        businessAddress: { ...form.businessAddress, [field]: value }
      });
    } else if (name.startsWith("bankDetails.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        bankDetails: { ...form.bankDetails, [field]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerSeller(form);
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
          boxShadow: "0 8px 32px rgba(60,72,88,0.15)",
          padding: "40px 32px",
          width: "100%",
          maxWidth: "440px",
          position: "relative"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px"
          }}
        >
          <img
            src="https://img.icons8.com/color/96/000000/shop.png"
            alt="Seller Icon"
            style={{ marginBottom: "8px" }}
          />
          <h2 style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#4f46e5",
            marginBottom: "4px"
          }}>Become a Seller</h2>
          <p style={{ color: "#64748b", fontSize: "1rem" }}>
            Join ShopEase and grow your business!
          </p>
        </div>
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "16px",
              textAlign: "center",
              fontWeight: 500
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="businessName"
            placeholder="Business Name"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="businessDescription"
            placeholder="Business Description"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <div style={{ margin: "10px 0" }}>
            <label style={{ fontWeight: 500, color: "#64748b", marginBottom: "4px", display: "block" }}>Business Address</label>
            <input name="businessAddress.street" placeholder="Street" onChange={handleChange} required style={inputStyle} />
            <input name="businessAddress.city" placeholder="City" onChange={handleChange} required style={inputStyle} />
            <input name="businessAddress.state" placeholder="State" onChange={handleChange} required style={inputStyle} />
            <input name="businessAddress.country" placeholder="Country" onChange={handleChange} required style={inputStyle} />
            <input name="businessAddress.postalCode" placeholder="Postal Code" onChange={handleChange} required style={inputStyle} />
          </div>
          <input
            name="businessLicense"
            placeholder="Business License"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="taxId"
            placeholder="Tax ID"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <div style={{ margin: "10px 0" }}>
            <label style={{ fontWeight: 500, color: "#64748b", marginBottom: "4px", display: "block" }}>Bank Details</label>
            <input name="bankDetails.accountNumber" placeholder="Account Number" onChange={handleChange} required style={inputStyle} />
            <input name="bankDetails.bankName" placeholder="Bank Name" onChange={handleChange} required style={inputStyle} />
            <input name="bankDetails.ifsc" placeholder="IFSC Code" onChange={handleChange} required style={inputStyle} />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg,#6366f1 0%,#818cf8 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "10px",
              padding: "12px 0",
              marginTop: "18px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(99,102,241,0.12)",
              transition: "background 0.2s"
            }}
          >
            Register
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "18px", fontSize: "0.95rem" }}>
          <span style={{ color: "#64748b" }}>Already have an account?</span>{" "}
          <span
            style={{
              color: "#46e576ff",
              fontWeight: 600,
              cursor: "pointer",
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

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  fontSize: "1rem",
  background: "#13d477ff",
  outline: "none",
  transition: "border 0.2s",
  boxSizing: "border-box"
};
