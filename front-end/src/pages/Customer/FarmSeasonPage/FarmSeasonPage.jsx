import axios from "axios";
import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMapMarkerAlt,
//   faTractor,
//   faCartPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate, useParams } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
// import { toast } from "react-toastify";
// import { addToCart } from "../../../service/CustomerService/cartService";
// import { jwtDecode } from "jwt-decode";
import FarmInfoShow from "../../../components/CustomerComponent/FarmInfoShow/FarmInfoShow.jsx";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer.jsx"; // Import FooterCustomer

import moment from "moment";

export default function FarmSeasonPage() {
  //   const navigate = useNavigate();
  let { id } = useParams(); // Lấy farmid từ URL
  console.log(id);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/farm/productdetail/${id}`) // Sử dụng farmid để lấy sản phẩm
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  //   const handleAddToCart = (productId) => {
  //     const accessToken = localStorage.getItem("accessToken");

  //     if (!accessToken) {
  //       toast.error("Đăng nhập để thêm vào giỏ hàng!", {
  //         position: "top-right",
  //         time: 500,
  //       });
  //       navigate("/login");
  //     } else {
  //       const decodedToken = jwtDecode(accessToken);
  //       const userId = decodedToken.userid;

  //       addToCart(productId, userId, 1)
  //         .then((response) => {
  //           response;
  //           toast.success("Thêm vào giỏ hàng thành công!");
  //         })
  //         .catch((error) => {
  //           toast.error(error.response.data.message);
  //         });
  //     }
  //   };

  return (
    <div>
      {/* Component FarmInfoShow được hiển thị ở đầu trang */}
      <FarmInfoShow />

      {/* Nội dung chính của trang */}
      <div className="bg-fourth m-auto flex flex-wrap justify-center">
        <div className=" w-4/5 mt-5 rounded-md bg-white m-auto flex flex-wrap justify-center">
          {products.map((product) => {
            const plantingDate = moment(product.plantingdate).format(
              "DD/MM/YYYY"
            );
            const harvestDate = moment(product.harvestdate).format(
              "DD/MM/YYYY"
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
                  <div className="font-bold text-center text-2xl mb-2 ">
                    {product.productname}
                  </div>
                  <p className="m-2 text-primary">
                    Mô tả:
                    <span className="text-primary font-bold">
                      {" "}
                      {product.productdes}
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Diện tích trồng:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {product.productarea}m2
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Ngày gieo trồng:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {plantingDate}
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Ngày thu hoạch:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {harvestDate}
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Sản lượng dự kiến:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {product.productexpected}kg
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Trạng thái:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {product.productstate}
                    </span>
                  </p>
                  {/* <p className="text-2xl m-3 font-bold italic text-green-500">
                    {product.productprice}đ
                  </p> */}
                  {/* <div className="flex justify-between items-center mt-4">
                    <div className="text-primary font-bold">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                        <p className="ml-2">{product.farmaddress}</p>
                      </div>
                      <div className="flex items-center mt-2">
                        <FontAwesomeIcon icon={faTractor} size="lg" />
                        <p className="ml-2">{product.farmname}</p>
                      </div>
                    </div>

                    <button
                      className="p-4 bg-white text-primary rounded-full hover:bg-primary-dark transition duration-200"
                      onClick={() => handleAddToCart(product.productid)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} size="2x" />
                    </button>
                  </div> */}
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
