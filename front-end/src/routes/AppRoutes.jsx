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
import PurchasesHistory from "../pages/Customer/PurchasesHistory/PurchasesHistory";
import AboutAgriPage from "../pages/Customer/AboutAgriPage/AboutAgriPage";
import FarmerDashboard from "../pages/Farmer/FarmerDashboard/FarmerDashboard";
import FarmerLogin from "../pages/Farmer/FarmerLogin/FarmerLogin";
import FarmerRegisterStep1 from "../pages/Farmer/FarmerRegister/FarmerRegisterStep1/FarmerRegisterStep1";
import FarmerRegisterStep2 from "../pages/Farmer/FarmerRegister/FarmerRegisterStep2/FarmerRegisterStep2";
import FarmerRegisterStep3 from "../pages/Farmer/FarmerRegister/FarmerRegisterStep3/FarmerRegisterStep3";
import FarmerShowProducts from "../pages/Farmer/FarmerProduct/FarmerShowProducts";
import FarmerShowFarm from "../pages/Farmer/FarmerFarm/FarmerShowFarm";
import FarmerShowOrders from "../pages/Farmer/FarmerOrder/FarmerShowOrders";
import CheckoutDetailPage from "../pages/Customer/CheckoutDetailPage/CheckoutDetailPage";
import FarmerDetailInfo from "../pages/Farmer/FarmerInfo/FarmerDetailInfo";
import DetailInfoPage from "../pages/Customer/DetailInfoPage/DetailInfoPage";

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
          <Route path='/checkout-detail/:id' element={<CheckoutDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/purchase-history" element={<PurchasesHistory />} />
          <Route path="/detail-info" element={<DetailInfoPage />} />
          <Route path="/about-agri" element={<AboutAgriPage />} />
          <Route path="/farm/info/:id" element={<FarmInfoPage />} />
          <Route path="/farm/productdetail/:id" element={<FarmProductPage />} />
          <Route path="/farm/season/:id" element={<FarmSeasonPage />} />

          {/* Route cho farmer */}
          <Route path="/farmer/login" element={<FarmerLogin />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/products" element={<FarmerShowProducts />} />
          <Route path="/farmer/farms" element={<FarmerShowFarm />} />
          <Route
            path="/farmer/register/step1"
            element={<FarmerRegisterStep1 />}
          />
          <Route
            path="/farmer/register/step2"
            element={<FarmerRegisterStep2 />}
          />
          <Route
            path="/farmer/register/step3"
            element={<FarmerRegisterStep3 />}
          />
          <Route path='/farmer/orders' element={<FarmerShowOrders />} />
          <Route path="/farmer/profile" element={<FarmerDetailInfo />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
