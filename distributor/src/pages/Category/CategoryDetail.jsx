import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function DetailCategory({ category, onClose }) {
  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/2 h-3/4 overflow-auto shadow-2xl">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>

        {/* Crop Title */}
        <h2 className="text-4xl font-bold text-center text-primary mb-4">
          {category.categoryname}
        </h2>

        {/* Crop Image */}
        <div className="flex justify-center mb-6">
          <img
            src={category.categoryimage}
            alt={category.categoryname}
            className="w-1/2 h-56 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Crop Details */}
        <div className="space-y-4">
          {[{ label: "Mô tả:", value: category.categorydes }].map(
            (item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <p className="font-semibold text-xl text-gray-700 w-1/3">
                  {item.label}
                </p>
                <p className="text-lg text-gray-600 text-justify w-2/3">
                  {item.value}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

DetailCategory.propTypes = {
  category: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
