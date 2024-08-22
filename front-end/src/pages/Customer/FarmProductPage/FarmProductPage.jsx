import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTractor,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import { toast } from "react-toastify";
import { addToCart } from "../../../service/CustomerService/cartService";
import { jwtDecode } from "jwt-decode";
import FarmInfoShow from "../../../components/CustomerComponent/FarmInfoShow/FarmInfoShow.jsx";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer.jsx"; // Import FooterCustomer

export default function FarmProductPage() {
  const navigate = useNavigate();
  let { id } = useParams(); // Lấy farmid từ URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/farm/productdetail/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  const handleAddToCart = (productId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!", {
        position: "top-right",
        time: 500,
      });
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.userid;

      addToCart(productId, userId, 1)
        .then((response) => {
          response;
          toast.success("Thêm vào giỏ hàng thành công!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div>
      {/* Component FarmInfoShow được hiển thị ở đầu trang */}
      <FarmInfoShow />

      {/* Nội dung chính của trang */}
      <div className="bg-fourth m-auto flex flex-wrap justify-center">
        <div className=" w-4/5 mt-5 mb-10 rounded-md bg-white m-auto flex flex-wrap justify-center">
          {products.map((product) => {
            const currentDate = new Date();
            const expireDate = new Date(product.expirydate);
            const remainingTime = expireDate - currentDate;
            const remainingDays = Math.floor(
              remainingTime / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={product.productid}
                className="w-1/4 bg-fourth max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1"
              >
                <Link
                  to={`/product/${product.productid}`}
                  key={product.productid}
                >
                  <img
                    className="w-full h-64 object-cover hover:opacity-80"
                    src={product.productimage1}
                    alt={product.productname}
                  />
                </Link>
                <div className="px-6 py-4 text-primary">
                  <Link
                    to={`/product/${product.productid}`}
                    key={product.productid}
                  >
                    <div className="font-bold text-center text-2xl mb-2 ">
                      {product.productname}
                    </div>
                    <p className="m-2 text-primary">
                      Có thể sử dụng trong:
                      <span className="text-primary font-bold">
                        {" "}
                        {remainingDays} ngày
                      </span>
                    </p>
                    <p className="text-sm m-2 text-primary">
                      Số lượng còn lại:{" "}
                      <span className="text-primary font-bold">
                        {" "}
                        {product.productquantity}kg
                      </span>
                    </p>
                    <p className="text-2xl m-3 font-bold italic text-green-500">
                      {product.productprice}đ
                    </p>
                  </Link>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/farm/info/${product.farmid}`}>
                      <div className="text-primary font-bold">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                          <p className="ml-2">{product.farmprovince}</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon icon={faTractor} size="lg" />
                          <p className="ml-2">{product.farmname}</p>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="p-4 bg-white text-primary rounded-full hover:bg-primary-dark transition duration-200"
                      onClick={() => handleAddToCart(product.productid)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} size="2x" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Component FooterCustomer được hiển thị ở cuối trang */}
        <FooterCustomer />
      </div>
    </div>
  );
}
