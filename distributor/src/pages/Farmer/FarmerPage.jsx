import { useNavigate } from "react-router-dom";
import HeaderDistributor from "../../components/HeaderDistributor";
import { ToastProvider } from "../../context/ToastContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

export default function FarmerPage() {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState([]);

  useEffect(() => {
    //Gọi api để lấy thông tin farmer
    const fetchFarmer = async () => {
      try {
        const response = await axios(`${API_BASE_URL}/farmer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFarmer(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin farmer:", error);
      }
    };
    fetchFarmer();
    console.log(farmer);
  }, [navigate]);

  return (
    <div>
      <HeaderDistributor />
      <div className="flex">
        <ToastProvider />
        <div className="bg-secondary w-full right-0 top-0 mt-20">
          <div className="w-10/12 m-auto bg-white rounded-lg px-3 mt-5">
            <h2 className="my-4 px-4 text-primary font-bold text-3xl">
              Danh sách nông dân
            </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-300 px-4 py-2">Tên</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Số điện thoại
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Ngày sinh
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
