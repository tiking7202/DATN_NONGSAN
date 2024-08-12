import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastProvider } from "../../context/ToastContext";
import CartPage from "../pages/Customer/CartPage/CartPage";
import CategoryPage from "../pages/Customer/CategoryPage/CategoryPage";
import CheckoutPage from "../pages/Customer/CheckoutPage/CheckoutPage";
import FarmInfoPage from "../pages/Customer/FarmInfoPage/FarmInfoPage";
import HomePage from "../pages/Customer/HomePage/HomePage";
import LoginCustomer from "../pages/Customer/LoginPage/LoginCustomer";
import ProductDetailShow from "../pages/Customer/ProductDetail/ProductDetailShow";
import RegisterCustomerStep1 from "../pages/Customer/RegisterPage/RegisterCustomerStep1/RegisterCustomerStep1";
import RegisterCustomerStep2 from "../pages/Customer/RegisterPage/RegisterCustomerStep2/RegisterCustomerStep2";
import SearchPage from "../pages/Customer/SearchPage/SearchPage";
import FarmProductPage from "../pages/Customer/FarmProductPage/FarmProductPage";
import FarmSeasonPage from "../pages/Customer/FarmSeasonPage/FarmSeasonPage";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Route cho customer  */}
          <Route path="/register/step1" element={<RegisterCustomerStep1 />} />
          <Route path="/register/step2" element={<RegisterCustomerStep2 />} />
          <Route path="/login" element={<LoginCustomer />} />
          <Route path="/product/:id" element={<ProductDetailShow />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/farm/info/:id" element={<FarmInfoPage />} />
          <Route path="/farm/productdetail/:id" element={<FarmProductPage />} />
          <Route path="/farm/season/:id" element={<FarmSeasonPage />} />
          {/* Route cho farmer */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
