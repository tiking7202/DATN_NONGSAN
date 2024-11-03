import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShipperDetail({ onClose, shipperId }) {
  const [shipperDetails, setShipperDetails] = useState(null);
  const [shipperStatus, setShipperStatus] = useState(null);

  useEffect(() => {
    const fetchShipper = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/shipper/${shipperId}`
        );
        setShipperDetails(response.data);
        setShipperStatus(response.data.shipperstatus);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin shipper:", error);
      }
    };
    fetchShipper();
  }, [shipperId]);

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      const newStatus = !shipperStatus;
      await axios.put(`${API_BASE_URL}/shipper/updatestatus/${shipperId}`, {
        shipperstatus: newStatus,
      });
      setShipperStatus(newStatus);
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái shipper:", error);
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-6 rounded w-4/12 m-auto overflow-auto shadow-2xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center text-primary font-bold">
          Chi tiết người giao hàng
        </h2>
        <div className="py-4 text-justify">
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">
              Tên người giao hàng:
            </p>
            <p className="text-lg font-medium ml-2">
              {shipperDetails?.fullname}
            </p>
          </div>
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">Địa chỉ:</p>
            <p className="text-lg font-medium ml-2">
              {shipperDetails?.street}, {shipperDetails?.commune},{" "}
              {shipperDetails?.district}, {shipperDetails?.province}
            </p>
          </div>
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">Số CMND/CCCD:</p>
            <p className="text-lg font-medium ml-2">
              {shipperDetails?.indentitycard}
            </p>
          </div>
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">Email:</p>
            <p className="text-lg font-medium ml-2">{shipperDetails?.email}</p>
          </div>
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">Số điện thoại:</p>
            <p className="text-lg font-medium ml-2">
              {shipperDetails?.phonenumber}
            </p>
          </div>
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">Khu vực giao hàng:</p>
            <p className="text-lg font-medium ml-2">
              {shipperDetails?.deliveryarea}
            </p>
          </div>
          <div className="flex m-3">
            <p className="font-bold text-xl text-primary">Trạng thái:</p>
            {shipperStatus ? (
              <>
                <p className="text-lg font-medium ml-2 text-green-500">
                  Đã kích hoạt
                </p>
                <button
                  onClick={handleStatusChange}
                  className="bg-red-500 text-white font-bold p-2 rounded-lg mx-3"
                >
                  Chặn
                </button>
              </>
            ) : (
              <>
                <p className="text-lg font-medium ml-2 text-red-500">
                  Chưa kích hoạt
                </p>
                <button
                  onClick={handleStatusChange}
                  className="bg-primary text-white font-bold p-2 rounded-lg mx-3"
                >
                  Kích hoạt
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ShipperDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  shipperId: PropTypes.string.isRequired,
};
