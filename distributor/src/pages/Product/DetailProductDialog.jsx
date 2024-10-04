import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { useEffect } from "react";

export default function DetailProductDialog({ onClose, product }) {
  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product]);
  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-6 rounded w-1/2 m-auto h-3/4 overflow-auto shadow-2xl text-primary">
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
        <div className="py-4 text-justify">
          <div className="flex flex-col">
            <div className="flex my-2 justify-around h-48">
              <img
                src={product.productimage1}
                alt={product.productname}
                className="w-1/3"
              />
              <img
                src={product.productimage2}
                alt={product.productname}
                className="w-1/3"
              />
              <img
                src={product.productimage3}
                alt={product.productname}
                className="w-1/3"
              />
            </div>

            <div className="flex my-2">
              <p className="font-medium text-xl">Danh mục sản phẩm:</p>
              <p className="text-lg ml-2">{product.categoryname}</p>
            </div>

            {/* <div className="flex my-2">
              <div className="flex w-1/2">
                <p className="font-medium text-xl">Số lượng còn lại:</p>
                <p className="text-lg ml-2">
                  {product.productquantity} {product.unitofmeasure}
                </p>
              </div>
              <div className="flex w-1/2">
                <p className="font-medium text-xl">Ngày hết hạn:</p>
                <p className="text-lg ml-2">{formatDate(product.expirydate)}</p>
              </div>
            </div>
            <div className="flex my-2">
              <div className="flex w-1/2">
                <p className="font-medium text-xl">Giá:</p>
                <p className="text-lg ml-2">{product.productprice} VNĐ</p>
              </div>
              <div className="flex w-1/2">
                <p className="font-medium text-xl">Giảm giá:</p>
                <p className="text-lg ml-2">{product.promotion} %</p>
              </div>
            </div>
            <div className="flex my-2">
              <div className="flex w-1/2">
                <p className="font-medium text-xl">Chất lượng sản phẩm:</p>
                <p className="text-lg ml-2">{product.productquality}</p>
              </div>
              <div className="flex w-1/2">
                <p className="font-medium text-xl">Kích cỡ sản phẩm:</p>
                <p className="text-lg ml-2">{product.productsize}</p>
              </div>
            </div> */}

            <div className="flex my-2">
              <p className="font-medium text-xl">Trang trại:</p>
              <p className="text-lg ml-2">
                {product.farmname} ({product.farmprovince})
              </p>
            </div>

            <div className="flex my-2">
              <p className="font-medium text-xl">
                Mô tả:
                <span className="text-lg ml-2 font-normal">
                  {product.overviewdes}
                </span>
              </p>
            </div>
            <div className="flex my-2">
              <p className="font-medium text-xl">
                Lợi ích đối với sức khỏe:
                <span className="text-lg ml-2 font-normal">
                  {product.healtbenefit}
                </span>
              </p>
            </div>
            <div className="flex my-2">
              <p className="font-medium text-xl">
                Phương pháp chế biến:
                <span className="text-lg ml-2 font-normal">
                  {product.cookingmethod}
                </span>
              </p>
            </div>
            <div className="flex my-2">
              <p className="font-medium text-xl">
                Cách bảo quản:
                <span className="text-lg ml-2 font-normal">
                  {product.storagemethod}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DetailProductDialog.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
};
