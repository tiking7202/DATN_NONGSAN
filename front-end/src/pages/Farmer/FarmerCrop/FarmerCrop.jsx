import { useEffect, useState } from "react";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEye,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../utils/formatDate";
// import { truncateText } from "../../../utils/truncaseText";
import FarmerCreateCrop from "./FarmerCreateCrop";
import FarmerDetailCrop from "./FarmerDetailcrop";
import FarmerDeleteCrop from "./FarmerDeleteCrop"; //
import FarmerUpdateCrop from "./FarmerUpdateCrop"; //
import { toast } from "react-toastify";

export default function FarmerShowCrop() {
  const [crops, setCrops] = useState([]);

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/farmer/crops/${userId}`,
          {
            params: {
              page,
              pageSize,
            },
          }
        );
        setCrops(response.data.crops);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCrops();
  }, [userId, page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Dialog form tạo sản phẩm mới
  const [isCreateCropDialogOpen, setIsCreateCropDialogOpen] = useState(false);
  const openCreateCropDialog = () => setIsCreateCropDialogOpen(true);

  //Dialog xem chi tiết sản phẩm
  const [isViewCropDialogOpen, setIsViewCropDialogOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  // const openViewProductDialog = () => setIsViewProductDialogOpen(true);
  const openViewCropDialog = async (cropid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/crop/${cropid}`);
      setIsViewCropDialogOpen(true);
      setSelectedCrop(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  //Dialog form chỉnh sửa sản phẩm
  const [isEditCropDialogOpen, setIsEditCropDialogOpen] = useState(false);
  const openEditCropDialog = async (cropid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/crop/${cropid}`);
      setSelectedCrop(response.data);
      setIsEditCropDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  //Dialog xác nhận xóa sản phẩm
  const [isDeleteCropDialogOpen, setIsDeleteCropDialogOpen] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const openDeleteCropDialog = () => setIsDeleteCropDialogOpen(true);

  const refreshCropList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/farmer/crops/${userId}`,
        {
          params: {
            page,
            pageSize,
          },
        }
      );
      const newCrops = response.data.crops;
      if (newCrops.length == 0 && page == 1) {
        toast.success("Không còn mùa vụ nào để hiện thị");
        return;
      }
      // Nếu không còn vụ mùa nào trên trang hiện tại và đang ở trang cuối cùng
      if (newCrops.length === 0 && page > 1) {
        setPage(page - 1); // Quay về trang trước
      } else {
        setCrops(newCrops); // Cập nhật danh sách vụ mùa mới
        setTotalPages(response.data.pagination.totalPages); // Cập nhật số trang
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách vụ mùa:", error);
    }
  };

  return (
    <div>
      <HeaderFarmer />
      <div className="flex">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20">
          <div className="w-11/12 m-auto bg-secondary rounded-lg px-3 py-2 mt-5">
            <div className="my-4">
              <button
                className="bg-primary px-4 py-2 text-secondary font-bold rounded-xl"
                onClick={openCreateCropDialog}
              >
                <FontAwesomeIcon icon={faPlus} className="text-xl mr-2" />
                Thêm Vụ Mùa
              </button>
            </div>

            <div className="my-4">
              <table className="w-full rounded-lg">
                <thead className="">
                  <tr className="bg-primary text-secondary border border-black">
                    <th className="py-3 w-1/10">Tên vụ mùa</th>
                    <th className="py-3 w-1/10">Hình ảnh</th>
                    {/* <th className="py-3 w-1/12">Diện tích</th> */}
                    <th className="py-3 w-1/10">Trang trại</th>
                    <th className="py-3 w-1/10">Sản lượng dự kiến</th>
                    <th className="py-3 w-1/10">Ngày gieo trồng</th>
                    <th className="py-3 w-1/10">ngày thu hoạch</th>
                    <th className="py-3 w-1/10">Trạng thái</th>
                    <th className="py-3 w-2/12"></th>
                  </tr>
                </thead>
                <tbody>
                  {crops && crops.length > 0 ? (
                    crops.map((crop) => (
                      <tr
                        key={crop.cropid}
                        className="font-medium border border-black"
                      >
                        <td className="w-1/12 text-center">{crop.cropname}</td>
                        <td className="w-1/12 text-center m-auto">
                          <img
                            src={crop.cropimage}
                            alt={crop.cropname}
                            className="h-14 w-5/6 m-auto"
                          />
                        </td>
                        {/* <td className="w-1/12 text-center">{crop.plantarea}</td> */}
                        <td className="w-1/10 text-center">{crop.farmname}</td>
                        <td className="w-1/10 text-center">
                          {crop.estimatedyield} kg
                        </td>
                        <td className="w-1/10 text-center">
                          {formatDate(crop.plantdate)}
                        </td>
                        <td className="w-1/10 text-center">
                          {formatDate(crop.harvestdate)}
                        </td>
                        <td className="w-1/10 text-center">
                          {crop.cropstatus}
                        </td>
                        <td className="w-1/6">
                          <div className="flex justify-center">
                            <button className="font-bold mx-3">
                              <FontAwesomeIcon
                                icon={faEye}
                                className="text-xl mr-2"
                                onClick={() => openViewCropDialog(crop.cropid)}
                              />
                            </button>
                            <button className="font-bold mx-3">
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-xl mr-2"
                                onClick={() => openEditCropDialog(crop.cropid)}
                              />
                            </button>
                            <button className="font-bold mx-3">
                              <FontAwesomeIcon
                                icon={faRemove}
                                className="text-xl mr-2"
                                onClick={() => {
                                  openDeleteCropDialog(crop.cropid);
                                  setSelectedCropId(crop.cropid);
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <div>No crops available</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
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
                    className="text-primary border border-black font-bold px-4 py-2 "
                    onClick={() => handlePageChange(page - 1)}
                  >
                    {page - 1}
                  </button>
                )}
                <button className="bg-primary text-secondary border border-black font-bold px-4 py-2 ">
                  {page}
                </button>
                {page < totalPages && (
                  <button
                    className="text-primary border border-black font-bold px-4 py-2 "
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
      {isCreateCropDialogOpen && (
        <FarmerCreateCrop
          onClose={() => {
            setIsCreateCropDialogOpen(false);
          }}
          userId={userId}
          refreshCropList={refreshCropList}
        />
      )}
      {isViewCropDialogOpen && (
        <FarmerDetailCrop
          crop={selectedCrop}
          onClose={() => setIsViewCropDialogOpen(false)}
        />
      )}
      {isEditCropDialogOpen && (
        <FarmerUpdateCrop
          onClose={() => setIsEditCropDialogOpen(false)}
          crop={selectedCrop}
          userId={userId}
          refreshCropList={refreshCropList}
        />
      )}
      {isDeleteCropDialogOpen && (
        <FarmerDeleteCrop
          onClose={() => setIsDeleteCropDialogOpen(false)}
          selectedCropId={selectedCropId}
          refreshCropList={refreshCropList}
        />
      )}
    </div>
  );
}
