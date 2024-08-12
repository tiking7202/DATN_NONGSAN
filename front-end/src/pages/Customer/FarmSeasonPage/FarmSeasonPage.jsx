import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import FarmInfoShow from "../../../components/CustomerComponent/FarmInfoShow/FarmInfoShow.jsx";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer.jsx"; // Import FooterCustomer

import moment from "moment";

export default function FarmSeasonPage() {
  let { id } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/farm/productdetail/${id}`) // Sử dụng farmid để lấy sản phẩm
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

 
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
