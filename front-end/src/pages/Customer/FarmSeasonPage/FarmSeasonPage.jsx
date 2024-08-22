import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import FarmInfoShow from "../../../components/CustomerComponent/FarmInfoShow/FarmInfoShow.jsx";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer.jsx"; // Import FooterCustomer

import moment from "moment";

export default function FarmSeasonPage() {
  let { id } = useParams();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/farm/season/${id}`)
      .then((response) => {
        setCrops(response.data);
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
        <div className=" w-4/5 mt-5 mb-10 rounded-md bg-white m-auto flex flex-wrap justify-center">
          {crops.map((crop) => {
            const plantingDate = moment(crop.plantdate).format("DD/MM/YYYY");
            const harvestDate = moment(crop.harvestdate).format("DD/MM/YYYY");
            return (
              <div
                key={crop.productid}
                className="w-1/4 bg-fourth max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1"
              >
                
                  <img
                    className="w-full h-64 object-cover hover:opacity-80"
                    src={crop.cropimage}
                    alt={crop.cropimage}
                  />
                
                <div className="px-6 py-4 text-primary">
                  <div className="font-bold text-center text-2xl mb-2 ">
                    {crop.cropname}
                  </div>
                  <p className="m-2 text-primary">
                    Mô tả:
                    <span className="text-primary font-bold">
                      {" "}
                      {crop.cropdes}
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Diện tích trồng:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {crop.plantarea}m2
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
                      {crop.estimatedyield}kg
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Trạng thái:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {crop.cropstatus}
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
