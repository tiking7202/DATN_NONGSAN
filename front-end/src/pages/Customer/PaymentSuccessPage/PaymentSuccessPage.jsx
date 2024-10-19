import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import { useToast } from "../../../context/ToastContext";
import { formatDate } from './../../../utils/formatDate';
import Loading from "../../../components/Loading";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToastMessage } = useToast();
  const [orderDetails, setOrderDetails] = useState();
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/checkout/confirm-payment/${sessionId}`
        );
        setOrderDetails(response.data);
        // setToastMessage("Thanh toán thành công! Đơn hàng đã được ghi nhận.");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId, setToastMessage]);

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
      // setToastMessage("Lưu thông tin thanh toán không thành công.");
    }
  };

  const handleConfirm = () => {
    savePaymentToDB("Đã thanh toán");
    navigate("/purchase-history");
  };

  return (
    <div className="min-h-screen bg-fourth flex flex-col justify-between">
      <HeaderCustomer />
      <div className="container mx-auto px-8 py-10 mt-32">
        <div className="bg-white shadow-2xl rounded-lg p-8 md:p-12 max-w-3xl mx-auto text-center">
          {loading ? (
            <Loading />
          ) : orderDetails ? (
            <>
              <h1 className="font-bold text-primary text-4xl">
                Thanh toán thành công!
              </h1>
              <p className="mt-6 text-gray-900 text-xl font-medium ">
                Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!
              </p>
              <p className="mt-4 text-gray-900 font-bold">
                Mã đơn hàng: <span className="font-medium">{orderDetails.orderId.slice(0,8)}</span>
              </p>
              <p className="mt-2 text-gray-900 font-bold">
                Tổng số tiền:{" "}
                <span className="font-medium">{orderDetails.totalAmount} đ</span>
              </p>
              <p className="mt-2 text-gray-900 font-bold">
                Ngày đặt hàng:{" "}
                <span className="font-medium">{formatDate(orderDetails.orderCreateTime)}</span>
              </p>
              <p className="mt-2 text-gray-900 font-bold">
                Địa chỉ giao hàng:{" "}
                <span className="font-medium">{orderDetails.shippingAddress}</span>
              </p>
              <p className="mt-2 text-gray-900 font-bold">
                Trạng thái đơn hàng:{" "}
                <span className="font-medium">{orderDetails.orderStatus}</span>
              </p>
              <p className="mt-2 text-gray-900 font-bold">
                Thời gian dự kiến giao hàng:{" "}
                <span className="font-medium">{formatDate(orderDetails.estimatedDelivery)}</span>
              </p>

              <div className="mt-8">
                <button
                  onClick={handleConfirm}
                  className="bg-primary hover:opacity-75 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
                >
                  Xác nhận
                </button>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-red-500 text-3xl">
              Đã xảy ra lỗi trong quá trình xử lý thanh toán!
            </h1>
          )}
        </div>
      </div>
      <FooterCustomer />
    </div>
  );
};

export default PaymentSuccessPage;
