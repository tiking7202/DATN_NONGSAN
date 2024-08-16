import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import { useEffect, useState } from "react";

import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FarmerOrderDetail from "./FarmerOrderDetail";

export default function FarmerShowOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const farmerId = decodedToken?.userid;
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async (page, limit) => {
      try {
        const response = await axios(
          `${API_BASE_URL}/farmer/orders/${farmerId}`,
          {
            params: {
              page,
              limit,
            },
          }
        );
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Failed to fetch orders: ", error);
      }
    };
    fetchOrders();
  }, [farmerId, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState(false);
  const [orderIdDetail, setOrderIdDetail] = useState(null);
  const openOrderDetailDialog = (orderId) => {
    console.log(orderId);
    setIsOpenOrderDetail(true);
    setOrderIdDetail(orderId);

  };
  return (
    <div>
      <HeaderFarmer />
      <div className="flex">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20">
          <div className="w-11/12 m-auto bg-secondary rounded-lg px-3 py-2 mt-5">
            <div className="my-4">
              <table className="w-full rounded-lg font-medium">
                <thead className="">
                  <tr className="text-center bg-primary text-secondary font-bold border border-black">
                    <td className="py-3 w-1/12">Mã đơn hàng</td>
                    <td className="py-3 w-2/12">Tên khách hàng</td>
                    <td className="py-3 w-2/12">Ngày đặt hàng</td>
                    <td className="py-3 w-1/12">Trạng thái</td>
                    <td className="py-3 w-3/12">Địa chỉ nhận hàng</td>
                    <td className="py-3 w-1/12">Tổng tiền</td>
                    <td className="py-3 w-2/12"></td>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(orders) ? orders : []).map((order) => (
                    <tr
                      key={order.orderid}
                      className="text-center border border-black"
                    >
                      <td className="py-3">{order.orderid.slice(0, 8)}</td>
                      <td className="">{order.fullname}</td>
                      <td className="">{formatDate(order.ordercreatetime)}</td>
                      <td className="">{order.orderstatus}</td>
                      <td className="">{order.shippingaddress}</td>
                      <td className="">
                        {order.totalamount.toLocaleString()} VNĐ
                      </td>
                      <td className="">
                        <button
                          className="font-bold mx-3 text-primary"
                          onClick={() => openOrderDetailDialog(order.orderid)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
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
      {isOpenOrderDetail && (
        <FarmerOrderDetail
          onClose={() => setIsOpenOrderDetail(false)}
          orderIdDetail={orderIdDetail}
        />
      )}
    </div>
  );
}
