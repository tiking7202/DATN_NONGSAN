import HeaderDistributor from "../../components/HeaderDistributor";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
export default function FarmerPage() {
  const [farmers, setFarmers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of items per page

  useEffect(() => {
    // Gọi api để lấy thông tin farmer
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/farmer`, {
          params: { page, limit },
        });
        setFarmers(response.data.farmersWithFarms);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin farmer:", error);
      }
    };
    fetchFarmers();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <HeaderDistributor />
      <div className="flex">
        <ToastContainer />
        <div className="bg-secondary w-full right-0 top-0 mt-20">
          <div className="w-10/12 m-auto bg-white rounded-lg px-3 mt-5">
            <h2 className="my-4 px-4 text-primary font-bold text-3xl">
              Danh sách nông dân
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="w-1/6 py-2">Tên chủ trang trại</th>
                    <th className="w-1/12 py-2">Số điện thoại</th>
                    <th className="w-1/4 py-2">Địa chỉ</th>
                    <th className="w-1/6 py-2">Trang trại</th>
                    <th className="w-1/6 py-2">Trạng thái</th>
                    <th className="w-1/6 py-2"></th>                    
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(farmers) ? (
                    farmers.map((farmer) => (
                      <tr
                        key={farmer.userid}
                        className="text-center font-medium border border-black"
                      >
                        <td className="py-2">{farmer.fullname}</td>
                        <td className="py-2">{farmer.phonenumber}</td>
                        <td className="py-2">
                          {farmer.street}, {farmer.commune}, {farmer.district},{" "}
                          {farmer.province}
                        </td>
                        <td className="py-2">{farmer.farmname}</td>
                        <td className="py-2">
                          {farmer.status === true
                            ? "Đã cấp phép"
                            : "Chưa cấp phép"}
                        </td>
                        <td className="py-2">
                          <button className="bg-primary text-white font-bold px-4 py-2 rounded-lg">
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-2">
                        No farmers available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center my-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="text-primary border border-black font-bold px-4 py-2 rounded-l-xl"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {page > 1 && (
                  <button
                    className="text-primary border border-black font-bold px-4 py-2"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    {page - 1}
                  </button>
                )}
                <button className="bg-primary text-secondary border border-black font-bold px-4 py-2">
                  {page}
                </button>
                {page < totalPages && (
                  <button
                    className="text-primary border border-black font-bold px-4 py-2"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                )}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="text-primary border border-black font-bold px-4 py-2 rounded-r-xl"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
