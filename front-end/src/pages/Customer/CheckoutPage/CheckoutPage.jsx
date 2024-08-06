import { useLocation, useNavigate } from "react-router-dom";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import FooterCustomer from "./../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { jwtDecode } from "jwt-decode";
import { getUserInfo } from "../../../service/CustomerService/userService";
import { useEffect, useState } from "react";
import { getShippingInfo } from "../../../service/CustomerService/checkoutService";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedItems } = location.state || { selectedItems: [] };

  // Lấy userid từ localStorage
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;

  const [userInfo, setUserInfo] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  // Lay thong tin user tu userId
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo(userId);
        setUserInfo(user);
        const shipping = await getShippingInfo(userId);
        setShippingInfo(shipping);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedItems.forEach((item) => {
      totalPrice += item.productprice * item.quantity;
    });
    return totalPrice;
  };

  const InfoOrder = () => {
    return selectedItems.map((item) => (
      <div
        key={item.productid}
        className="flex w-full justify-between items-center p-4 border-b border-gray-200"
      >
        <img
          src={item.productimage1}
          alt={item.productname1}
          className="w-1/5 object-cover rounded"
        />
        <h3 className="w-1/4 text-lg font-bold text-primary ml-2">
          {item.productname}
        </h3>
        <p className="w-1/4 text-lg font-semibold text-primary">
          ${item.productprice}
        </p>
        <p className="w-1/4 text-lg font-semibold text-primary">
          {item.quantity}
        </p>
      </div>
    ));
  };

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async () => {
    // const totalPrice = calculateTotalPrice() + 10; // Assuming $10 shipping fee
    const orderDetails = {
      userId: userId,
      paymentMethod: paymentMethod,
      items: selectedItems.map((item) => ({
        productId: item.productid,
        quantity: item.quantity,
        price: item.productprice,
      })),
      shippingAddress: shippingInfo.deliveryAddress,
      estimatedDeliveryTime: shippingInfo.estimatedDeliveryTime,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/checkout`,
        orderDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Checkout successful:", response.data);
      // Update UI or redirect user to a success page
      toast.success("Đặt hàng thành công!");
      // Redirect user to purchase history page
      // navigate("/purchase-history");
      navigate("/");
    } catch (error) {
      console.error("Checkout failed:", error);
      // Update UI to show error message
    }
  };
  return (
    <div className="bg-fourth">
      <HeaderCustomer />
      <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-32">
        <h1 className="font-bold text-primary text-2xl">THÔNG TIN ĐƠN HÀNG</h1>
      </div>
      <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-5 flex justify-center">
        <div className="w-1/2 justify-between">{InfoOrder()}</div>

        <div className="w-1/3 bg-fourth rounded-sm flex flex-col justify-end text-center text-primary p-3">
          <h1 className="font-bold text-xl mb-4">THÔNG TIN THANH TOÁN</h1>

          <div className="space-y-2">
            <div className="w-6/12 h-0.5 m-auto bg-primary"></div>
            <div className="">
              <h2 className="font-bold text-xl ml-3 flex">
                Thông tin khách hàng
              </h2>
              <div className="flex items-center ml-5 my-2">
                <p className="font-bold">Tên khách hàng:</p>
                <p className="text-gray-900 ml-2">
                  {userInfo ? userInfo.fullname : ""}
                </p>
              </div>
              <div className="flex items-center ml-5 my-2">
                <p className="font-bold">Số điện thoại:</p>
                <p className="text-gray-900 ml-2">
                  {userInfo ? userInfo.phonenumber : ""}
                </p>
              </div>
              <div className="flex items-center ml-5 my-2">
                <p className="font-bold ">Địa chỉ:</p>
                <p className="text-gray-900 ml-2">
                  {userInfo
                    ? userInfo.street +
                      ", " +
                      userInfo.commune +
                      ", " +
                      userInfo.district +
                      ", " +
                      userInfo.province
                    : ""}
                </p>
              </div>
            </div>
            <div className="w-11/12  h-0.5 m-auto bg-primary"></div>
            <div className="">
              <h2 className="font-bold text-xl ml-3 flex">
                Chọn phương thức thanh toán
              </h2>
              <div className="ml-5 my-3">
                <div className="flex">
                  <input
                    type="radio"
                    name="payment"
                    id="payment1"
                    value="Thanh toán khi nhận hàng"
                    className="w-4"
                    onChange={handlePaymentChange}
                  />
                  <p className="ml-2">Thanh toán khi nhận hàng</p>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    name="payment"
                    id="payment2"
                    value="Thanh toán online"
                    className="w-4"
                    onChange={handlePaymentChange}
                  />
                  <p className="ml-2">Thanh toán online</p>
                </div>
              </div>
            </div>

            <div className="w-11/12  h-0.5 m-auto bg-primary"></div>
            <div className="">
              <h2 className="font-bold text-xl ml-3 flex">
                Thông tin vận chuyển
              </h2>
              <div className="flex items-center ml-5 my-2">
                <p className="font-bold ">Địa chỉ nhận hàng:</p>
                <p className="text-gray-900 ml-2 ">
                  {userInfo
                    ? userInfo.street +
                      ", " +
                      userInfo.commune +
                      ", " +
                      userInfo.district +
                      ", " +
                      userInfo.province
                    : ""}
                </p>
                <a href="" className="ml-2">
                  Thay đổi
                </a>
              </div>
              <div className="flex items-center ml-5 my-2">
                <p className="font-bold ">Thời gian giao:</p>
                <p className="text-gray-900 ml-2 ">20/11/2023</p>
              </div>
            </div>

            <div className="w-11/12  h-0.5 m-auto bg-primary"></div>
            <div className="">
              <h2 className="font-bold text-xl ml-3 flex">Tóm tắt đơn hàng</h2>
              <div className="flex items-center ml-5 my-3">
                <p className="font-bold">Tổng tiền:</p>
                <p className="text-gray-900 ml-2">${calculateTotalPrice()}</p>
              </div>
              <div className="flex items-center ml-5 my-3">
                <p className="font-bold">Phí vận chuyển:</p>
                <p className="text-gray-900 ml-2">$10</p>
              </div>
              <div className="flex items-center ml-5 my-3">
                <p className="font-bold">Tổng cộng:</p>
                <p className="text-gray-900 ml-2">
                  ${calculateTotalPrice() + 10}
                </p>
              </div>
            </div>

            <button
              className="bg-primary text-white p-2 rounded-md w-2/3 mt-5 hover:opacity-80 transition duration-300"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>

      <FooterCustomer />
    </div>
  );
};

export default CheckoutPage;
