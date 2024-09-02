import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/Product/ProductPage";
import CategoryPage from "../pages/Category/CategoryPage";
import OrderPage from "../pages/Order/OrderPage";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}
