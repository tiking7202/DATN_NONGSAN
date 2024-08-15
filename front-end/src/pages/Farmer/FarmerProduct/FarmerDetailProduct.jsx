import { PropTypes } from "prop-types";
import { formatDate } from "../../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function FarmerDetailProduct({ product, onClose }) {
  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center m-auto">
      <div className="bg-white p-6 rounded w-1/2 m-auto text-primary h-2/3 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">
          {product.productname}
        </h2>
        <div className="py-4">
          <div className="flex flex-col">
            <div className="flex my-2 justify-around">
              <img
                src={product.productimage1}
                alt={product.productname}
                className="w-1/4"
              />
              <img
                src={product.productimage2}
                alt={product.productname}
                className="w-1/4"
              />
              <img
                src={product.productimage3}
                alt={product.productname}
                className="w-1/4"
              />
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Danh mục sản phẩm:</p>
              <p className="w-5/6 text-lg ml-2">{product.categoryname}</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl = w-1/6">Trang trại:</p>
              <p className="text-lg ml-2 w-5/6">{product.farmname}</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Mô tả:</p>
              <p className="text-lg ml-2 w-5/6">{product.overviewdes}</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Số lượng còn lại:</p>
              <p className="text-lg ml-2 w-5/6">
                {product.productquantity} {product.unitofmeasure}
              </p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Giá:</p>
              <p className="text-lg ml-2 w-5/6">{product.productprice} VNĐ</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Ngày hết hạn:</p>
              <p className="text-lg ml-2 w-5/6">{formatDate(product.expirydate)}</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">
                Lợi ích đối với sức khỏe:
              </p>
              <p className="text-lg ml-2 w-5/6">{product.healtbenefit}</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Phương pháp chế biến:</p>
              <p className="text-lg ml-2 w-5/6">{product.cookingmethod}</p>
            </div>
            <div className="flex my-2">
              <p className="font-bold text-xl w-1/6">Cách bảo quản:</p>
              <p className="text-lg ml-2 w-5/6">{product.storagemethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

FarmerDetailProduct.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
