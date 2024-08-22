import { PropTypes } from "prop-types";
import { formatDate } from "../../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function FarmerDetailCrop({ crop, onClose }) {
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
          {crop.cropname}
        </h2>

        {/* Crop Image */}
        <div className="flex justify-center mb-6">
          <img
            src={crop.cropimage}
            alt={crop.cropname}
            className="w-1/2 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Crop Details */}
        <div className="space-y-4">
          {[
            { label: "Diện tích:", value: `${crop.plantarea} m²` },
            { label: "Ngày gieo trồng:", value: formatDate(crop.plantdate) },
            { label: "Ngày thu hoạch:", value: formatDate(crop.harvestdate) },
            { label: "Sản lượng dự kiến:", value: `${crop.estimatedyield} kg` },
            { label: "Trạng thái:", value: crop.cropstatus },
            { label: "Mô tả:", value: crop.cropdes },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <p className="font-semibold text-xl text-gray-700 w-1/6 ">
                {item.label}
              </p>
              <p className="text-lg text-gray-600 w-5/6 text-justify">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

FarmerDetailCrop.propTypes = {
  crop: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
