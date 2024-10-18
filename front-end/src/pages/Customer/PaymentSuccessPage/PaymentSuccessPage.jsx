import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import { useToast } from "../../../context/ToastContext";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToastMessage } = useToast();
  const [orderDetails, setOrderDetails] = useState();
  const [loading, setLoading] = useState(true);

  // Lấy session_id từ URL
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  // Gọi API để lấy thông tin đơn hàng từ session_id
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/checkout/confirm-payment/${sessionId}`
        );
        console.log("Order details response:", response.data);
        setOrderDetails(response.data);
        setToastMessage("Thanh toán thành công! Đơn hàng đã được ghi nhận.");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        // setToastMessage("Thanh toán không thành công, vui lòng thử lại!");
        setLoading(false);
      }
    };

    // console.log("Order Detail:", orderDetails);

    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId, setToastMessage]);

  useEffect(() => {
    if (orderDetails) {
      console.log("Updated orderDetails:", orderDetails); // In ra khi state đã được cập nhật
    }
  }, [orderDetails]);

  // Hàm lưu thông tin thanh toán vào DB
  const savePaymentToDB = async (paymentStatus) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/checkout/save-payment`,
        {
          userId: orderDetails.userId,
          orderId: orderDetails.orderId,
          amount: orderDetails.totalAmount,
          paymentMethod: orderDetails.paymentMethod,
          paymentStatus: paymentStatus,
        }
      );
      setToastMessage(response.data.message);
    } catch (error) {
      console.error("Error saving payment info:", error);
      setToastMessage("Lưu thông tin thanh toán không thành công.");
    }
  };

  // Xử lý khi nhấn "Xác nhận"
  const handleConfirm = () => {
    savePaymentToDB("Đã thanh toán");
    navigate("/purchase-history");
  };

  // Xử lý khi nhấn "Huỷ bỏ"
  const handleCancel = () => {
    savePaymentToDB("Đang chờ thanh toán");
    navigate("/purchase-history"); // Giả sử đây là đường dẫn đến trang giỏ hàng
  };

  return (
    <div className="bg-fourth">
      <HeaderCustomer />
      <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-32 text-center">
        {loading ? (
          <h1 className="font-bold text-primary text-2xl">Đang xử lý...</h1>
        ) : orderDetails ? (
          <>
            <h1 className="font-bold text-primary text-2xl">
              Thanh toán thành công!
            </h1>
            <p className="mt-4">
              Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!
            </p>
            <p className="mt-2">Mã đơn hàng: {orderDetails.orderId}</p>
            <p className="mt-2">Tổng số tiền: {orderDetails.totalAmount} VND</p>
            <p className="mt-2">
              Ngày đặt hàng:{" "}
              {new Date(orderDetails.orderCreateTime).toLocaleDateString()}
            </p>
            <p className="mt-2">
              Địa chỉ giao hàng: {orderDetails.shippingAddress}
            </p>
            <p className="mt-2">
              Trạng thái đơn hàng: {orderDetails.orderStatus}
            </p>
            <p className="mt-2">
              Thời gian dự kiến giao hàng: {orderDetails.estimatedDelivery}
            </p>

            <div className="mt-5">
              <button
                onClick={handleConfirm}
                className="bg-primary text-white p-2 rounded-md mx-2"
              >
                Xác nhận
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white p-2 rounded-md mx-2"
              >
                Huỷ bỏ
              </button>
            </div>
          </>
        ) : (
          <h1 className="font-bold text-red-500 text-2xl">
            Đã xảy ra lỗi trong quá trình xử lý thanh toán!
          </h1>
        )}
      </div>
      <FooterCustomer />
    </div>
  );
};

export default PaymentSuccessPage;
