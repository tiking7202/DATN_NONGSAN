import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";

export default function DetailProductDialog({ onClose, product }) {
  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-10 rounded-2xl w-1/2 m-auto h-2/3 overflow-auto shadow-2xl text-primary">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {[
                product.productimage1,
                product.productimage2,
                product.productimage3,
              ]
                .filter(Boolean)
                .map((imgSrc, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imgSrc}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg transition-transform transform group-hover:scale-105"
                    />
                  </div>
                ))}
            </div>
            <div className="flex my-2">
              <p className="font-medium text-xl">Danh mục sản phẩm:</p>
              <p className="text-lg ml-2">{product.categoryname}</p>
            </div>

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
