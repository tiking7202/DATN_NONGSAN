import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../../config/config";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import { useNavigate } from "react-router-dom";
import { updateQuantityCart } from "../../../service/CustomerService/cartService";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;
  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/cart`, { userId })
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, [userId]);

  const onDeleteCart = (userId, productId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-white p-5 rounded shadow-lg w-full m-auto flex flex-col justify-between">
            <div>
              <h1 className="text-2xl text-center font-bold mb-4">
                Xác nhận xóa
              </h1>
              <p className="mb-6 text-lg">
                Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const response = await axios.delete(
                      `${API_BASE_URL}/delete-cart/${userId}/${productId}`
                    );
                    console.log(response.data);
                    toast.success(
                      "Xóa thành công sản phẩm từ giỏ hàng của bạn",
                      {
                        position: "top-right",
                      }
                    );
                    setCart(
                      cart.filter((item) => item.productid !== productId)
                    );
                    // Update your state here to reflect the change in the cart
                  } catch (error) {
                    console.error("Error:", error);
                  }
                  onClose();
                }}
              >
                Đồng ý
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const [selectedItems, setSelectedItems] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  // const calculateTotalPrice = () => {
  //   return selectedItems.reduce((total, item) => {
  //     return total + item.productprice * item.quantity;
  //   }, 0);
  // };

  const handleUpdateQuantity = (productid, quantity) => {
    if (quantity === 0) {
      toast.error("Số lượng sản phẩm phải lớn hơn 0", {
        position: "top-right",
      });
      return;
    }
    updateQuantityCart(userId, productid, quantity);

    setCart(prevCart => 
      prevCart.map(item => 
        item.productid === productid ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn sản phẩm để thanh toán", {
        position: "top-right",
      });
      return;
    }
    navigate("/checkout", { state: { selectedItems } });
  };

  return (
    <div className="bg-fourth">
      <HeaderCustomer />

      <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-32">
        <h1 className="font-bold text-primary text-2xl">GIỎ HÀNG CỦA BẠN</h1>
      </div>

      <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-5">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                STT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Hình ảnh
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Tên sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Đơn giá
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Số lượng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Trạng thái sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Chọn mua
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map((item, index) => (
              <tr key={index}>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  {index + 1}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  <img
                    src={item.productimage1}
                    alt={item.productimage1}
                    className="w-36 h-16 object-cover m-auto"
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  {item.productname}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  {item.productprice}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  {item.quantity > 0 && (
                    <button
                      className="font-bold text-2xl mx-2"
                      onClick={() =>
                        handleUpdateQuantity(item.productid, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                  )}
                  {item.quantity}
                  <button
                    className="font-bold text-2xl mx-2"
                    onClick={() =>
                      handleUpdateQuantity(item.productid, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  {item.productquantity > item.quantity
                    ? "Còn hàng"
                    : "Hết hàng"}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  <input
                    type="checkbox"
                    className="bg-primary text-white px-3 py-1 rounded-md m-2"
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth font-bold">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md m-2"
                    onClick={() => onDeleteCart(userId, item.productid)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="flex justify-end p-3 ">
          <span className="text-lg font-bold">
            Tổng tiền: {calculateTotalPrice()}{" "}
          </span>
        </div> */}
        <div className="flex justify-end">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md m-2"
            onClick={handleCheckout}
          >
            Thanh toán
          </button>
          {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md m-2">
            Bỏ chọn tất cả{" "}
          </button> */}
        </div>
      </div>

      <FooterCustomer />
    </div>
  );
}
