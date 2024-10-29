import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import { useEffect, useState } from "react";

import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../../../utils/formatDate";
import FarmerOrderDetail from "./FarmerOrderDetail";
import { Pagination } from "../../../components/Pagination";

export default function FarmerShowOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const farmerId = decodedToken?.userid;
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/farmer/orders/${farmerId}`,
          {
            params: {
              page,
              pageSize,
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
  }, [farmerId, page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState(false);
  const [orderIdDetail, setOrderIdDetail] = useState(null);
  const openOrderDetailDialog = (orderId) => {
    setIsOpenOrderDetail(true);
    setOrderIdDetail(orderId);
  };

  const refreshOrders = () => {
    const fetchOrders = async () => {
      try {
        const response = await axios(
          `${API_BASE_URL}/farmer/orders/${farmerId}`,
          {
            params: {
              page,
              pageSize,
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
                    <td className="py-3 w-1/12">Ngày đặt</td>
                    <td className="py-3 w-3/12">Địa chỉ nhận hàng</td>
                    <td className="py-3 w-1/12">Tổng tiền</td>
                    <td className="py-3 w-1/12">Trạng thái</td>
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
                      {/* <td className="">{formatDate(order.orderupdatetime)}</td> */}
                      <td className="">{order.shippingaddress}</td>
                      <td className="">
                        {order.totalamount.toLocaleString()} đ
                      </td>
                      <td className="py-3 flex justify-center items-center my-auto">
                        {/* <select
                          value={order.orderstatus}
                          onChange={handleStatusChange}
                          className="mr-1 w-2/3"
                        >
                          <option value="Đã tạo">Đã tạo</option>
                          <option value="Đang xử lý">Đang xử lý</option>
                          <option value="Đang giao hàng">Đang giao hàng</option>
                          <option value="Đã giao hàng">Đã giao hàng</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                        <button className="text-primary rounded-xl" 
                          onClick={ () => onChangeStatus(order.orderid, orderStatus) }
                        >Lưu</button> */}
                        {order.orderstatus}
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
              {/* Pagination */}
              {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            )}
            </div>
          </div>
        </div>
      </div>
      {isOpenOrderDetail && (
        <FarmerOrderDetail
          onClose={() => setIsOpenOrderDetail(false)}
          orderIdDetail={orderIdDetail}
          refreshOrders={refreshOrders}
        />
      )}
    </div>
  );
}
