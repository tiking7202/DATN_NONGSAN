import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterCustomerStep1 from "../pages/Customer/RegisterPage/RegisterCustomerStep1/RegisterCustomerStep1";
import RegisterCustomerStep2 from "../pages/Customer/RegisterPage/RegisterCustomerStep2/RegisterCustomerStep2";
import HomePage from "../pages/Customer/HomePage/HomePage";
import LoginCustomer from "../pages/Customer/LoginPage/LoginCustomer";
import NotFound from "../pages/NotFound/NotFound";
import CategoryPage from "../pages/Customer/CategoryPage/CategoryPage";
import ProductDetailShow from "../pages/Customer/ProductDetail/ProductDetailShow";
export default function AppRoutes() {
    return (
        <div>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register/step1" element={<RegisterCustomerStep1 />} />
                <Route path="/register/step2" element={<RegisterCustomerStep2 />} />
                <Route path="/product/:id" element={<ProductDetailShow />} />
                <Route path="/login" element={<LoginCustomer />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
        </div>
    );
}
