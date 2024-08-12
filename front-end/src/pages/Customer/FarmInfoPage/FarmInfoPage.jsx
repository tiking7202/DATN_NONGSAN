import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FarmInfoShow from "../../../components/CustomerComponent/FarmInfoShow/FarmInfoShow.jsx";
import { API_BASE_URL } from "../../../config/config.js";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function FarmInfoPage() {
  const [farmData, setFarmData] = useState(null);
  // const [product, setProduct] = useState([]);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/farm/info/${id}`)
      .then((response) => {
        console.log(response);
        setFarmData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(`${API_BASE_URL}/product/${id}`)
  //     .then((response) => {
  //       console.log(response);
  //       setProduct(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, [id]);

  if (!farmData) return <p>Loading...</p>;

  return (
    <div className="bg-fourth text-gray-800">
      <FarmInfoShow />

      <div className="container mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg w-4/5">
        {/* Nội dung farm */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-3">
            CÁC THÔNG TIN VỀ TRANG TRẠI
          </h2>
          <p className="text-lg">{farmData.farmdes}</p>

          <h2 className="text-2xl font-bold mb-3 mt-5">SẢN PHẨM VÀ DỊCH VỤ</h2>
          <p className="text-lg">{farmData.farmservice}</p>

          <h2 className="text-2xl font-bold mb-3 mt-5">TẦM NHÌN VÀ CAM KẾT</h2>
          <p className="text-lg">{farmData.farmcommit}</p>

          <h2 className="text-2xl font-bold mb-3 mt-5">
            LỜI MỜI GỌI HÀNH ĐỘNG
          </h2>
          <p className="text-lg">{farmData.farminvite}</p>
        </div>

        {/* Hình ảnh */}
        <h2 className="text-2xl font-bold mb-3 mt-5">MỘT SỐ HÌNH ẢNH</h2>
        <div className=" mb-8 w-full ">
          <div className="flex justify-center mt-2">
            <img
              src={farmData.farmimage1}
              alt="product"
              className="object-cover rounded-md mx-3 w-48 h-40 cursor-pointer"
            />
            <img
              src={farmData.farmimage2}
              alt="product"
              className="object-cover rounded-md mx-3 w-48 h-40 cursor-pointer"
            />
            <img
              src={farmData.farmimage3}
              alt="product"
              className="object-cover rounded-md mx-3 w-48 h-40 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Thông tin liên hệ và tổng số sản phẩm */}
      <div className="container mx-auto p-8 mt-6 bg-white rounded-lg shadow-lg w-4/5">
        <h2 className="text-2xl font-bold mb-2"> Thông tin liên hệ</h2>
        <p className="text-xl">
          {" "}
          <FontAwesomeIcon icon={faPhone} className="mr-3 text-xl" />
          Số điện thoại: {farmData.farmphone}
        </p>
        <p className="text-xl">
          <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-xl" />
          Email: {farmData.farmemail}
        </p>
        <p className="text-xl">
          {" "}
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-xl" />
          Tỉnh/Thành phố: {farmData.farmdistrict}
        </p>
        {/* Số sản phẩm */}
        <div className="mt-2">
          <p className="text-lg font-bold text-xl">
            <FontAwesomeIcon icon={faListAlt} className="mr-3 text-xl" />
            Tổng số loại sản phẩm trang trại cung cấp:{" "}
            <span className="text-3xl text-primary">
              {farmData.farmproductstotal}
            </span>
          </p>
        </div>
      </div>

      <FooterCustomer />
    </div>
  );
}
