import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// import { useEffect} from "react";

const CreateCrop = ({ onClose, userId, refreshCropList }) => {
  const [cropname, setCropName] = useState("");
  const [cropdes, setCropDes] = useState("");
  const [plantarea, setPlantArea] = useState("");
  const [harvestdate, setHarvestDate] = useState("");
  const [plantdate, setPlantDate] = useState("");
  const [estimatedyield, setEstimatedYield] = useState("");
  const [cropstatus, setCropStatus] = useState("");
  const [cropimage, setCropImage] = useState("");
  const [farmid, setFarmid] = useState("");

  const [cropnameErrol, setCropNameErrol] = useState("");
  const [cropdesErrol, setCropDesErrol] = useState("");
  const [plantareaErrol, setPlantAreaErrol] = useState("");
  const [harvestdateErrol, setHarvestDateErrol] = useState("");
  const [plantdateErrol, setPlantDateErrol] = useState("");
  const [estimatedyieldErrol, setEstimatedYieldErrol] = useState("");
  const [cropstatusErrol, setCropStatusErrol] = useState("");
  const [cropimageErrol, setCropImageErrol] = useState("");
  const [farmidError, setFarmidError] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate tên vụ mùa
    if (cropname.trim() === "") {
      setCropNameErrol("Tên cây trồng là bắt buộc");
      isValid = false;
    } else {
      setCropNameErrol("");
    }

    // Validate mô tả vụ mùa
    if (cropdes.trim() === "") {
      setCropDesErrol("Mô tả cây trồng là bắt buộc");
      isValid = false;
    } else {
      setCropDesErrol("");
    }

    // Validate diện tích trồng
    if (plantarea.trim() === "" || isNaN(plantarea) || Number(plantarea) <= 0) {
      setPlantAreaErrol("Diện tích trồng hợp lệ là bắt buộc");
      isValid = false;
    } else {
      setPlantAreaErrol("");
    }

    // Validate ngày thu hoạch
    if (harvestdate.trim() === "") {
      setHarvestDateErrol("Ngày thu hoạch là bắt buộc");
      isValid = false;
    } else {
      setHarvestDateErrol("");
    }

    // Validate ngày trồng
    if (plantdate.trim() === "") {
      setPlantDateErrol("Ngày trồng là bắt buộc");
      isValid = false;
    } else {
      setPlantDateErrol("");
    }

    // Validate sản lượng ước tính
    if (
      estimatedyield.trim() === "" ||
      isNaN(estimatedyield) ||
      Number(estimatedyield) <= 0
    ) {
      setEstimatedYieldErrol("Sản lượng ước tính là bắt buộc");
      isValid = false;
    } else {
      setEstimatedYieldErrol("");
    }

    // Validate trạng thái vụ mùa
    if (cropstatus.trim() === "") {
      setCropStatusErrol("Trạng thái vụ mùa là bắt buộc");
      isValid = false;
    } else {
      setCropStatusErrol("");
    }

    // Validate hình ảnh vụ mùa
    if (cropimage.trim() === "") {
      setCropImageErrol("Hình ảnh vụ mùa là bắt buộc");
      isValid = false;
    } else {
      setCropImageErrol("");
    }

    if (farmid.trim() === "") {
      setFarmidError("Trang trại không được để trống");
      isValid = false;
    } else {
      setCropImageErrol("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newCrop = {
      cropname,
      cropdes,
      plantarea,
      harvestdate,
      plantdate,
      estimatedyield,
      cropstatus,
      cropimage,
      farmid,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/farm/create/crop`,
        newCrop
      );
      if (response.status === 200) {
        onClose();
        if (toast && typeof toast.success === "function") {
          toast.success("Thêm vụ mùa thành công");
          refreshCropList();
        } else {
          console.error("Toast is not properly initialized");
        }
      }
      // Reset form fields after successful submission
      setCropName("");
      setCropDes("");
      setPlantArea("");
      setHarvestDate("");
      setPlantDate("");
      setEstimatedYield("");
      setCropStatus("");
      setCropImage("");
    } catch (error) {
      console.error("Error creating crop:", error);
      toast.error(error.response.data, {
        position: "top-right",
        time: 500,
      });
    }
  };

  const [farms, setFarms] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const farm = await axios.get(`${API_BASE_URL}/farm/user/${userId}`);
        let farmsData = farm.data;
        setFarms(farmsData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [userId]);

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-3 rounded w-1/2 m-auto text-primary h-3/4 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">Thêm vụ mùa</h2>
        <div className="py-4">
          {/* 1 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label
                htmlFor="cropname"
                className="block text-xl text-primary font-bold mb-2"
              >
                Tên vụ mùa
              </label>
              <input
                id="cropname"
                type="text"
                placeholder="Tên vụ mùa"
                value={cropname}
                onChange={(e) => setCropName(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {cropnameErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {cropnameErrol}
                </p>
              )}
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="plantarea"
                className="block text-xl text-primary font-bold mb-2"
              >
                Diện tích
              </label>
              <input
                id="plantarea"
                type="text"
                placeholder="Diện tích"
                value={plantarea}
                onChange={(e) => setPlantArea(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {plantareaErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {plantareaErrol}
                </p>
              )}
            </div>
          </div>
          {/* 2 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label
                htmlFor="farm"
                className="block text-xl text-primary font-bold mb-2"
              >
                Trang trại
              </label>
              <select
                id="farm"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                onChange={(e) => setFarmid(e.target.value)}
              >
                <option value="" className="bg-secondary">
                  Chọn trang trại
                </option>
                {farms.map((farm) => (
                  <option
                    key={farm.farmid}
                    value={farm.farmid}
                    className="bg-secondary"
                  >
                    {farm.farmname}
                  </option>
                ))}
              </select>
              {farmidError && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {farmidError}
                </p>
              )}
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="estimatedyield"
                className="block text-xl text-primary font-bold mb-2"
              >
                Sản lượng dự kiến
              </label>
              <input
                id="estimatedyield"
                type="text"
                placeholder="Sản lượng dự kiến"
                value={estimatedyield}
                onChange={(e) => setEstimatedYield(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {estimatedyieldErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {estimatedyieldErrol}
                </p>
              )}
            </div>
          </div>
          {/* 3 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label
                htmlFor="plantdate"
                className="block text-xl text-primary font-bold mb-2"
              >
                Ngày gieo trồng
              </label>
              <input
                id="plantdate"
                placeholder="Ngày gieo trồng"
                type="date"
                value={plantdate}
                onChange={(e) => setPlantDate(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {plantdateErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {plantdateErrol}
                </p>
              )}
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="harvestdate"
                className="block text-xl text-primary font-bold mb-2"
              >
                Ngày thu hoạch
              </label>
              <input
                id="harvestdate"
                placeholder="Ngày thu hoạch"
                type="date"
                value={harvestdate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {harvestdateErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {harvestdateErrol}
                </p>
              )}
            </div>
          </div>
          {/* 4 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label
                htmlFor="cropstatus"
                className="block text-xl text-primary font-bold mb-2"
              >
                Trạng thái
              </label>
              <input
                id="cropstatus"
                type="text"
                placeholder="Trạng thái "
                value={cropstatus}
                onChange={(e) => setCropStatus(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {cropstatusErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {cropstatusErrol}
                </p>
              )}
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="cropimage"
                className="block text-xl text-primary font-bold mb-2"
              >
                Hình ảnh
              </label>
              <input
                id="cropimage"
                placeholder="Hình ảnh"
                type="text"
                value={cropimage}
                onChange={(e) => setCropImage(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {cropimageErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {cropimageErrol}
                </p>
              )}
            </div>
          </div>

          {/* 5 */}
          <div className="flex justify-between my-2">
            <div className="w-full mx-2">
              <label
                htmlFor="cropdes"
                className="block text-xl text-primary font-bold mb-2"
              >
                Mô tả
              </label>
              <textarea
                id="cropdes"
                placeholder="Mô tả"
                type="text"
                value={cropdes}
                onChange={(e) => setCropDes(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500  h-32"
              />
              {cropdesErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {cropdesErrol}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end my-2">
            <button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary-700 text-white text-xl font-bold py-2 px-4 rounded-xl mx-2 mt-2"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateCrop.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  refreshCropList: PropTypes.func.isRequired,
};

export default CreateCrop;
