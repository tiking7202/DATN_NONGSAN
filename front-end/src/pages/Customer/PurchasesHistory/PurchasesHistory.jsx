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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function PurchasesHistory() {
  const [purchasesHistory, setPurchasesHistory] = useState([]);
  const { toastMessage, setToastMessage } = useToast();

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchPurchasesHistory = async () => {
      try {
        if (toastMessage) {
          toast.success(toastMessage);
          setToastMessage(null); 
        }

        const response = await axios.get(`${API_BASE_URL}/purchase-history/${userId}`, {
          params: {
            page,
            pageSize,
          },
        });
        setPurchasesHistory(response.data.purchaseHistory);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPurchasesHistory();
  }, [userId, page, pageSize, toastMessage, setToastMessage]);

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

      <div className="w-2/3 mx-auto mb-7 bg-white rounded-md p-5 mt-5">
        <table className="min-w-full divide-y divide-gray-900">
          <thead className="bg-secondary">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-bold text-gray-900 uppercase tracking-wider text-center"
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
          <tbody className="bg-white font-medium divide-y divide-gray-200">
            {purchasesHistory ?  purchasesHistory.map((purchase, index) => (
              <tr key={purchase.orderId}>

                <td className="px-5 py-3 whitespace-nowrap text-lg text-center text-gray-900 bg-fourth ">
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
            )) : (
              <tr>
                <td colSpan="6" className="text-center text-lg text-gray-900 bg-fourth">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* pagination */}
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
      <FooterCustomer />
      {isDialogOpen && (
        <OrderDetailsDialog order={selectedOrder} onClose={handleCloseDialog} />
      )}
    </div>
  );
}
