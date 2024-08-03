import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterCustomerStep1 from "../pages/Customer/RegisterPage/RegisterCustomerStep1/RegisterCustomerStep1";
import RegisterCustomerStep2 from "../pages/Customer/RegisterPage/RegisterCustomerStep2/RegisterCustomerStep2";
import HomePage from "../pages/Customer/HomePage/HomePage";
import LoginCustomer from "../pages/Customer/LoginPage/LoginCustomer";
import NotFound from "../pages/NotFound/NotFound";
import CategoryPage from "../pages/Customer/CategoryPage/CategoryPage";
import ProductDetailShow from "../pages/Customer/ProductDetail/ProductDetailShow";
import CartPage from "../pages/Customer/CartPage/CartPage";
import SearchPage from "../pages/Customer/SearchPage/SearchPage";
import { ToastProvider } from "../../context/ToastContext";

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
            <Route path="/search" element={<SearchPage />} />

            {/* Route cho farmer */}

            <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
        </ToastProvider>
    );
}
