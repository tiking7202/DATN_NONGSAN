import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
export default function DeleteCartDialog({
  onClose,
  productId,
  userId,
  refreshCart,
}) {
  const onDelete = async () => {
    try {
      // Call API here
      const response = await axios.delete(
        `${API_BASE_URL}/delete-cart/${userId}/${productId}`
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Xóa thành công sản phẩm từ giỏ hàng của bạn");
        onClose();
        refreshCart();
      } else {
        toast.error("Xóa sản phẩm thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center h-screen w-full">
      <div className="bg-white p-6 rounded w-1/2 m-auto text-primary h-11/12 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="">
          <h2 className="text-3xl text-center font-bold">Xác nhận xóa</h2>
          <p className="text-center text-lg mt-3">
            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không? Sản phẩm
            sẽ bị xóa khỏi giỏ hàng và không thể khôi phục.
          </p>
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="bg-red-600 hover:opacity-90 text-white text-xl font-bold py-2 px-4 rounded-xl w-1/6"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-primary hover:bg-primary-700 text-white text-xl font-bold py-2 px-4 rounded-xl ml-5 w-1/6"
            onClick={onDelete}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteCartDialog.propTypes = {
  onClose: PropTypes.func,
  productId: PropTypes.string,
  userId: PropTypes.string,
  refreshCart: PropTypes.func,
};
