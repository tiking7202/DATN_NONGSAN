import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
import { formatDate } from "../../../utils/formatDate";
import { addToCart } from "../../../service/CustomerService/cartService";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

export default function ProductBatchDialog({ onClose, selectedProduct }) {
  const navigate = useNavigate();

  const [productBatchs, setProductBatchs] = useState([]);
  const [batchId, setBatchId] = useState("");
  const {setToastMessage} = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product-batch/${selectedProduct.productid}`
        );
        setProductBatchs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [selectedProduct]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userid;
      if (!batchId) {
        toast.error("Vui lòng chọn lô hàng bạn muốn mua!");
        return;
      }
      try {
        await addToCart(selectedProduct.productid, userId, 1, batchId);
        toast.success("Thêm vào giỏ hàng thành công!");
        setBatchId("");
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.message);
      } 
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-4 rounded-lg w-5/12 m-auto text-primary overflow-auto shadow-2xl border border-primary relative">
        <ToastContainer />
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">Chọn lô hàng để mua</h2>
        <div className="m-2 flex justify-around">
          {productBatchs.map((batch) => (
            <div
              key={batch.batchid}
              className={`p-2 rounded mr-2 my-2 shadow-xl cursor-pointer border hover:opacity-80 ${
                batchId === batch.batchid
                  ? "bg-primary text-white"
                  : "bg-fourth"
              }`}
              onClick={() =>
                setBatchId(batchId === batch.batchid ? "" : batch.batchid)
              }
            >
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Mã lô hàng:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {batch.batchid.substring(0, 8)}
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Giá:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {Number(batch.batchprice).toLocaleString()} / (
                  {batch.unitofmeasure})
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Giảm giá:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {batch.promotion} %
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Tình trạng:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {batch.batchquality}
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Số lượng còn lại:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {batch.batchquantity}
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Ngày hết hạn:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {formatDate(batch.expirydate)}
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Ngày trồng:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {formatDate(batch.plantingdate)}
                </span>
              </div>
              <div>
                <span
                  className={`font-medium mr-1 ${
                    batchId === batch.batchid ? "text-white" : "text-primary"
                  }`}
                >
                  Ngày thu hoạch:{" "}
                </span>
                <span
                  className={`font-semibold ${
                    batchId === batch.batchid ? "text-white" : ""
                  }`}
                >
                  {formatDate(batch.harvestdate)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
          </div>
      </div>
    </div>
  );
}
ProductBatchDialog.propTypes = {
  onClose: PropTypes.func,
  selectedProduct: PropTypes.object,
};
