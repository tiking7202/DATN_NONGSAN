import { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { formatDate, formatDateInput } from "../../utils/formatDate";
import axios from "axios";
import { API_BASE_URL } from "../../../../front-end/src/config/config";
import { toast } from "react-toastify";

export default function DetailProductBatch({ onClose, selectedProductBatch }) {
  const [editedBatch, setEditedBatch] = useState({});
  const [productBatch, setProductBatch] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState(null);

  const handleEditClick = (batch) => {
    setIsEdit(true);
    setEditedBatch(batch);
    setEditingBatchId(batch.batchid);
  };

  useEffect(() => {
    setProductBatch(selectedProductBatch);
  }, [selectedProductBatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBatch((prev) => ({ ...prev, [name]: value }));
  };

  const updateProductBatch = async (batch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/update/product-batch/${batch.batchid}`,
        batch
      );

      return response;
    } catch (error) {
      console.error("Error updating product batch:", error);
      return null;
    }
  };

  const handleSaveClick = async () => {
    const updatedBatch = await updateProductBatch(editedBatch);

    setIsEdit(false);
    setEditingBatchId(null);
    toast.success(updatedBatch.data.message);
    refreshProductBatch(updatedBatch.data.batch.productid);
  };

  const refreshProductBatch = (productid) => {
    axios
      .get(`${API_BASE_URL}/product-batch/${productid}`)
      .then((response) => {
        setProductBatch(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product batch:", error);
      });
  };

  const handleDeleteClick = async (batchid) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete/product-batch/${batchid}`
      );
      toast.success(response.data.message);
      refreshProductBatch(selectedProductBatch[0].productid);
    } catch (error) {
      console.error("Error deleting product batch:", error);
      toast.error("Xóa lô hàng thất bại!");
    }
  };

  const handleToggleVisibility = async (batchId) => {
    try {
      const batchIndex = productBatch.findIndex(
        (batch) => batch.batchid === batchId
      );
      const updatedBatch = {
        ...productBatch[batchIndex],
        isvisible: !productBatch[batchIndex].isvisible,
      };

      const response = await axios.patch(
        `${API_BASE_URL}/update/product-batch/isvisible/${batchId}`,
        { isVisible: updatedBatch.isvisible }
      );

      const updatedProductBatch = [...productBatch];
      updatedProductBatch[batchIndex] = updatedBatch;
      setProductBatch(updatedProductBatch);

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái hiển thị!");
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-6 rounded w-6/12 m-auto text-primary h-3/5 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center text-primary font-bold">
          Các lô hàng của sản phẩm
        </h2>
        <div className="py-4 text-justify flex flex-wrap justify-around">
          {productBatch.length > 0 ? (
            productBatch.map((batch) => (
              <div
                key={batch.batchid}
                className="bg-fourth shadow-xl rounded-lg p-6 m-4 w-5/12 text-primary font-bold "
              >
                {isEdit && editingBatchId === batch.batchid ? (
                  <>
                    <label
                      htmlFor="batchid"
                      className="block text-lg text-primary font-bold mb-2"
                    >
                      Mã lô hàng:
                    </label>
                    <input
                      type="text"
                      name="batchid"
                      id="batchid"
                      value={editedBatch.batchid.substring(0, 8)}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                      disabled
                    />
                    <label htmlFor="batchquantity" className="block mt-2">
                      Số lượng:
                    </label>
                    <input
                      type="text"
                      name="batchquantity"
                      id="batchquantity"
                      value={editedBatch.batchquantity}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    />
                    <label
                      htmlFor="unitofmeasure"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Đơn vị:
                    </label>
                    <input
                      type="text"
                      name="unitofmeasure"
                      id="unitofmeasure"
                      value={editedBatch.unitofmeasure}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    />
                    <label
                      htmlFor="batchprice"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Giá:
                    </label>
                    <input
                      type="text"
                      name="batchprice"
                      id="batchprice"
                      value={editedBatch.batchprice}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    />

                    <label
                      htmlFor="promotion"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Khuyến mãi:
                    </label>
                    <input
                      type="text"
                      name="promotion"
                      id="promotion"
                      value={editedBatch.promotion}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                      disabled
                    />
                    <label
                      htmlFor="plantingdate"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Ngày trồng:
                    </label>
                    <input
                      type="date"
                      name="plantingdate"
                      id="plantingdate"
                      value={formatDateInput(editedBatch.plantingdate)}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    />
                    <label
                      htmlFor="harvestdate"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Ngày thu hoạch:
                    </label>
                    <input
                      type="date"
                      name="harvestdate"
                      id="harvestdate"
                      value={formatDateInput(editedBatch.harvestdate)}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    />
                    <label
                      htmlFor="expirydate"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Ngày hết hạn:
                    </label>
                    <input
                      type="date"
                      name="expirydate"
                      id="expirydate"
                      value={formatDateInput(editedBatch.expirydate)}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    />
                    <label
                      htmlFor="batchquality"
                      className="block text-xl text-primary font-bold mb-2"
                    >
                      Chất lượng:
                    </label>
                    <select
                      name="batchquality"
                      id="batchquality"
                      value={editedBatch.batchquality}
                      onChange={handleInputChange}
                      className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                      disabled
                    >
                      <option value="Tươi">Tươi</option>
                      <option value="Tương đối tươi">Tương đối tươi</option>
                      <option value="Bình thường">Bình thường</option>
                      <option value="Sắp hết hạn">Sắp hết hạn</option>
                    </select>

                    <div className="flex justify-end mt-2">
                      <button
                        className="px-3 py-2 mx-2 bg-primary text-white rounded-lg hover:opacity-85"
                        onClick={handleSaveClick}
                      >
                        Lưu
                      </button>
                      <button
                        className="px-3 py-2 mx-2 bg-red-600 text-white rounded-lg hover:opacity-85"
                        onClick={() => {
                          setIsEdit(false);
                          setEditingBatchId(null);
                        }}
                      >
                        Hủy
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="">
                      Mã lô hàng:{" "}
                      <span className="font-semibold">
                        {batch.batchid.substring(0, 8)}
                      </span>
                    </p>
                    <p className="mt-2">
                      Số lượng:{" "}
                      <span className="font-semibold">
                        {batch.batchquantity} ({batch.unitofmeasure})
                      </span>
                    </p>
                    <p className=" mt-2">
                      Giá:{" "}
                      <span className="font-semibold ">
                        {Number(batch.batchprice).toLocaleString()} đ
                      </span>
                    </p>
                    <p className=" mt-2">
                      Khuyến mãi:{" "}
                      <span className="font-semibold ">{batch.promotion}%</span>
                    </p>
                    <p className=" mt-2">
                      Ngày trồng:{" "}
                      <span className="font-semibold">
                        {formatDate(batch.plantingdate)}
                      </span>
                    </p>
                    <p className=" mt-2">
                      Ngày thu hoạch:{" "}
                      <span className="font-semibold">
                        {formatDate(batch.harvestdate)}
                      </span>
                    </p>
                    <p className=" mt-2">
                      Ngày hết hạn:{" "}
                      <span className="font-semibold">
                        {formatDate(batch.expirydate)}
                      </span>
                    </p>
                    <p className="mt-2">
                      Chất lượng:{" "}
                      <span className="font-semibold">
                        {batch.batchquality}
                      </span>
                    </p>
                    <p className="mt-2">
                      Trạng thái:{" "}
                      <button
                        className={`px-2 py-1 text-primary rounded-lg hover:bg-opacity-90 hover:text-white ${
                          batch.isvisible
                            ? "hover:bg-primary"
                            : "hover:bg-red-500"
                        }`}
                        onClick={() => handleToggleVisibility(batch.batchid)}
                      >
                        {batch.isvisible ? "Hiển thị" : "Ẩn"}
                      </button>
                    </p>

                    <div className="flex justify-end mt-4 mr-4">
                      <button
                        className="px-7 py-2 mx-2 bg-primary text-white rounded-xl hover:opacity-85"
                        onClick={() => handleEditClick(batch)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-7 py-2 mx-2 bg-red-600 text-white rounded-xl hover:opacity-85"
                        onClick={() => handleDeleteClick(batch.batchid)}
                      >
                        Xóa
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="mt-10">Chưa có lô hàng nào!</p>
          )}
        </div>
      </div>
    </div>
  );
}

DetailProductBatch.propTypes = {
  onClose: PropTypes.func,
  selectedProductBatch: PropTypes.array,
};
