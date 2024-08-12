import { useEffect, useState } from "react";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";

export default function FarmerShowProducts() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/farmer/products/${userId}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [userId]); 

  return (
    <div>
      <HeaderFarmer />
      <div className="flex mt-20">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20">
          <h1>
            Dashboard
          </h1>
          </div>
      </div>
    </div>
  )
}
