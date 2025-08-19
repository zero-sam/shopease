import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterBuyer from "../pages/auth/RegisterBuyer";
import RegisterSeller from "../pages/auth/RegisterSeller";
import ProductListPage from "../pages/products/ProductListPage";
import ProtectedRoute from "./ProtectedRoute";
import MyOrdersPage from "../pages/buyer/MyOrdersPage";
import CheckoutPage from "../pages/buyer/CheckoutPage";
import SellerDashboard from "../pages/seller/SellerDashboard";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import CartPage from "../pages/buyer/CartPage";
import RegisterChoice from "../pages/RegisterChoice";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-buyer" element={<RegisterBuyer />} />
      <Route path="/register-seller" element={<RegisterSeller />} />
  <Route path="/register" element={<RegisterChoice />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/buyer/checkout"
        element={<CheckoutPage />}
      />

      <Route
        path="/buyer/orders"
        element={<MyOrdersPage />}
      />

      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute roles={["seller"]}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
