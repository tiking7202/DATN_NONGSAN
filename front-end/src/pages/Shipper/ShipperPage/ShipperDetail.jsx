import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/config";

export default function ShipperDetail({ onClose, orderIdDetail }) {
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/shipper/order/${orderIdDetail}`
        );
        setOrderDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetail();
  }, [orderIdDetail]);

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-5/12 m-auto text-primary shadow-xl border border-primary">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary text-3xl font-bold"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">Chi tiết đơn hàng</h2>
        <div className="border border-primary mt-2"></div>

        <div className="py-4">
          <div className="flex my-2">
            <p className="font-bold text-xl w-1/4 mx-3">Mã đơn hàng:</p>
            <p className="text-lg w-3/4">{orderDetail?.orderId}</p>
          </div>
          <div className="flex my-2">
            <p className="font-bold text-xl w-1/4 mx-3">Tên khách hàng:</p>
            <p className="text-lg w-3/4">{orderDetail?.user?.fullName}</p>
          </div>
          <div className="flex my-2">
            <p className="font-bold text-xl w-1/4 mx-3">Số điện thoại:</p>
            <p className="text-lg w-3/4">{orderDetail?.user?.phonenumber}</p>
          </div>
          <div className="flex my-2">
            <p className="font-bold text-xl w-1/4 mx-3">Địa chỉ giao hàng:</p>
            <p className="text-lg w-3/4">{orderDetail?.deliveryAddress}</p>
          </div>
          <div className="flex my-2">
            <p className="font-bold text-xl w-1/4 mx-3">Tổng tiền:</p>
            <p className="text-lg w-3/4">{orderDetail?.totalAmount} đ</p>
          </div>
          <div className="flex my-2">
            <p className="font-bold text-xl w-1/4 mx-3">Trạng thái:</p>
            <p className="text-lg w-3/4">{orderDetail?.orderStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ShipperDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderIdDetail: PropTypes.string.isRequired,
};
