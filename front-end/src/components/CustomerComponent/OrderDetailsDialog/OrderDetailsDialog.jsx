import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const OrderDetailsDialog = ({ order, onClose }) => {
  // Ensure order is an array
  const orderArray = Array.isArray(order) ? order : [order];

  if (orderArray.length === 0) return null;

  return (
    <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2 m-auto text-primary">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-2xl text-center font-bold mb-4">
          Chi tiết đơn hàng
        </h2>
        <ul className="mb-4">
          {orderArray.map((product, index) => (
            <li key={index} className="mb-2 p-1 flex  items-center">
              <img
                src={product.productimage1}
                alt={product.productname}
                className="w-1/6"
              />

              <p className="w-1/6 text-center font-bold ">
                {product.productname}
              </p>
              <p className="w-1/2 text-left">{product.overview}</p>

              <p className="w-1/6  text-center text-2xl">{product.quantity}</p>
            </li>
          ))}
        </ul>
        {/* <div className="flex justify-end">
          <button
            className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Đóng
          </button>
        </div> */}
      </div>
    </div>
  );
};

OrderDetailsDialog.propTypes = {
  order: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        productimage1: PropTypes.string.isRequired,
        productname: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
      })
    ),
    PropTypes.shape({
      productimage1: PropTypes.string.isRequired,
      productname: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsDialog;
