import axios from "axios";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import HeaderCustomer from "./../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import { API_BASE_URL } from "../../../config/config";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import OrderDetailsDialog from "../../../components/CustomerComponent/OrderDetailsDialog/OrderDetailsDialog";
import { formatDate } from './../../../utils/formatDate';
import { useToast } from "../../../../context/ToastContext";
import { toast } from "react-toastify";

export default function PurchasesHistory() {
  const [purchasesHistory, setPurchasesHistory] = useState([]);
  const { toastMessage, setToastMessage } = useToast();

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;
  useEffect(() => {
    const fetchPurchasesHistory = async () => {
      try {
        if (toastMessage) {
          toast.success(toastMessage);
          setToastMessage(null); 
        }

        const response = await axios.get(`${API_BASE_URL}/purchase-history/${userId}`);
        setPurchasesHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPurchasesHistory();
  }, [userId]);

  const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //dialog order detail
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleButtonClick = (orderId) => {
    getOrderById(orderId).then(order => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    }).catch(error => {
        console.error('Error:', error);
    });
};

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };



  return (
    <div className="bg-fourth">
      <HeaderCustomer />
      <div className="w-2/3 mx-auto bg-white rounded-md p-5 mt-32">
        <h1 className="font-bold text-primary text-2xl">LỊCH SỬ MUA</h1>
      </div>

      <div className="w-2/3 mx-auto bg-white rounded-md p-5 mt-5">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-gray-50">
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
                Mã đơn hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Ngày mua
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                Tổng tiền
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
              >
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchasesHistory.map((purchase, index) => (
              <tr key={purchase.orderId}>

                <td className="px-5 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
                  {index + 1}
                </td>
                
                <td className="px-5 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
                  {purchase.orderId.slice(0, 8)}
                </td>
                <td className="px-5 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
                  {purchase.orderStatus}
                </td>
                <td className="px-5 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
                  {formatDate(purchase.purchaseDate)}
                </td>
                <td className="px-5 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
                  {purchase.totalAmount.toLocaleString()} VNĐ
                </td>
                <td className="px-5 py-2 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
                  <button  className="text-primary"
                  onClick={() => handleButtonClick(purchase.orderId)}>Xem chi tiết</button> 
            
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterCustomer />
      {isDialogOpen && (
        <OrderDetailsDialog order={selectedOrder} onClose={handleCloseDialog} />
      )}
    </div>
  );
}
