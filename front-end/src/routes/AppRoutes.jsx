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
import CheckoutPage from "../pages/Customer/CheckoutPage/CheckoutPage";
import PurchasesHistory from "../pages/Customer/PurchasesHistory/PurchasesHistory";
import ChangeInfo from "../pages/Customer/ChangeInfo/ChangeInfo";
import AboutAgriPage from "../pages/Customer/AboutAgriPage/AboutAgriPage";
import FarmerDashboard from "../pages/Farmer/FarmerDashboard/FarmerDashboard";
import FarmerLogin from "../pages/Farmer/FarmerLogin/FarmerLogin";

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
            <Route path="/purchase-history" element={<PurchasesHistory />} />
            <Route path="/change-info" element={<ChangeInfo />} />
            <Route path="/about-agri" element={<AboutAgriPage />} />
            
            {/* Route cho farmer */}
            <Route path="/farmer/login" element={<FarmerLogin />} />
            <Route path="/farmer" element={<FarmerDashboard />} />

            <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
        </ToastProvider>
    );
}
