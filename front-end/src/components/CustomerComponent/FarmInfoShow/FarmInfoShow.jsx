import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import HeaderCustomer from "../HeaderCustomer/HeaderCustomer";

export default function FarmInfoShow() {
  // Có 2 TH cần xử lý:
  // 1. Lấy thông tin trang trại theo productid
  // 2. Lấy thông tin trang trại theo farmid

  const [farm, setFarm] = useState(null);
  const location = useLocation();
  const resourceType = location.pathname.split("/")[1];
  const id = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        let response;
        if (resourceType === "product") {
          response = await axios.get(`${API_BASE_URL}/farm/product/${id}`);
        } else  {
          response = await axios.get(`${API_BASE_URL}/farm/${id}`);
        } 
        setFarm(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchFarmData();
  }, [resourceType, id]);
  return (
    <div>
      <HeaderCustomer />

      <div className="bg-fourth mt-32">
        <div className="w-4/5 mx-auto bg-white px-3 pt-8 pb-5 rounded-md">
          {farm && farm.farmname && (
            <p className="font-bold text-2xl text-primary">
              Tên trang trại:{" "}
              <span className="ml-3 text-third">{farm.farmname}</span>
            </p>
          )}
        </div>

        <div className="w-4/5 bg-white rounded-md m-auto mt-3 flex items-stretch h-96">
          <div className="w-3/12 object-fit">
            <img
              src={farm?.farmlogo}
              alt="farm"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="w-9/12 object-fit">
            <img
              src={farm?.farmimage}
              alt="farm"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        {/* Navigation */}
        <div className="w-4/5 bg-white rounded-md m-auto mt-3 flex p-5">
          <Link
            to={`/farm/info/${farm?.farmid}`}
            className="text-2xl font-bold text-primary mx-5"
          >
            Giới thiệu
          </Link>

          <Link
            to={`/farm/productdetail/${farm?.farmid}`}
            className="text-2xl font-bold text-primary mx-5"
          >
        
            Sản phẩm
          </Link>
          <Link
            to={`/farm/season/${farm?.farmid}`}
            className="text-2xl font-bold text-primary mx-5"
          >
            Thông tin mùa vụ
          </Link>
        </div>
      </div>
    </div>
  );
}
