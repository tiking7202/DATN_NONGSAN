import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/config";
import { getFarmByFarmId } from "../../../service/CustomerService/farmService";
import { toast } from "react-toastify";
// import { formatDate } from "../../../utils/formatDate";

export default function FarmerUpdateCrop({
  onClose,
  crop,
  userId,
  refreshCropList,
}) {
  const [cropname, setCropName] = useState(crop.cropname);
  const [cropdes, setCropDes] = useState(crop.cropdes);
  const [plantarea, setPlantArea] = useState(crop.plantarea);
  const [harvestdate, setHarvestDate] = useState(crop.harvestdate);
  const [plantdate, setPlantDate] = useState(crop.plantdate);
  const [estimatedyield, setEstimatedYield] = useState(crop.estimatedyield);
  const [cropstatus, setCropStatus] = useState(crop.cropstatus);
  const [cropimage, setCropImage] = useState(crop.cropimage);
  const [farmid, setFarmid] = useState(crop.farmid);

  //error state
  const [cropnameErrol, setCropNameErrol] = useState("");
  const [cropdesErrol, setCropDesErrol] = useState("");
  const [plantareaErrol, setPlantAreaErrol] = useState("");
  const [harvestdateErrol, setHarvestDateErrol] = useState("");
  const [plantdateErrol, setPlantDateErrol] = useState("");
  const [estimatedyieldErrol, setEstimatedYieldErrol] = useState("");
  const [cropstatusErrol, setCropStatusErrol] = useState("");
  const [cropimageErrol, setCropImageErrol] = useState("");
  const [farmidError, setFarmidError] = useState("");

  const [farms, setFarms] = useState([]);

  const [farmName, setFarmName] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const farm = await axios.get(`${API_BASE_URL}/farm/user/${userId}`);
        let farmsData = farm.data;
        setFarms(farmsData);

        const farmRes = await getFarmByFarmId(farmid);
        let farmData = farmRes.farmname;
        setFarmName(farmData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [userId]);

  const validateForm = () => {
    let isValid = true;

    // Validate tên vụ mùa
    if (cropname.trim() === "") {
      setCropNameErrol("Tên vụ mùa là bắt buộc");
      isValid = false;
    } else {
      setCropNameErrol("");
    }

    // Validate mô tả vụ mùa
    if (cropdes.trim() === "") {
      setCropDesErrol("Mô tả vụ mùa là bắt buộc");
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
      setEstimatedYieldErrol("Sản lượng ước tính hợp lệ là bắt buộc");
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
  const onUpdateCrop = async (cropid) => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.put(
        `${API_BASE_URL}/farmer/update/crop/${cropid}`,
        {
          cropname,
          cropdes,
          plantarea,
          harvestdate,
          plantdate,
          estimatedyield,
          cropstatus,
          cropimage,
          farmid,
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success("Cập nhật vụ mùa thành công");
        refreshCropList();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center m-auto">
      <div className="bg-white p-6 rounded w-1/2 m-auto text-primary h-3/4 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold "
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">Cập nhật vụ mùa</h2>
        <div className="py-4">
          {/* 1 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Tên vụ mùa
              </label>
              <input
                type="text"
                placeholder="Tên vụ mùa"
                value={cropname}
                onChange={(e) => setCropName(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="text-red-500 mt-1 text-xs italic">
                {cropnameErrol}
              </p>
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="plantarea"
                className="block text-xl text-primary font-bold mb-2"
              >
                Diện tích
              </label>
              <input
                type="text"
                placeholder="Diện tích"
                value={plantarea}
                onChange={(e) => setPlantArea(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {plantareaErrol}
              </p>
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
                <option value={farmid} className="">
                  {farmName}
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
                <p className="mt-1 text-red-500">{farmidError}</p>
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
                type="text"
                placeholder="Sản lượng dự kiến"
                value={estimatedyield}
                onChange={(e) => setEstimatedYield(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {estimatedyieldErrol}
              </p>
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
                type="date"
                placeholder="Ngày gieo trồng"
                value={formatDate(plantdate)}
                onChange={(e) => setPlantDate(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {plantdateErrol}
              </p>
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="harvestdate"
                className="block text-xl text-primary font-bold mb-2"
              >
                Ngày thu hoạch
              </label>
              <input
                type="date"
                placeholder="Ngày thu hoạch"
                value={formatDate(harvestdate)}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {harvestdateErrol}
              </p>
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
                type="text"
                placeholder="Trạng thái"
                value={cropstatus}
                onChange={(e) => setCropStatus(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {cropstatusErrol}
              </p>
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="cropimage"
                className="block text-xl text-primary font-bold mb-2"
              >
                Hình ảnh
              </label>
              <input
                type="text"
                placeholder="Hình ảnh"
                value={cropimage}
                onChange={(e) => setCropImage(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {cropimageErrol}
              </p>
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
              <input
                type="text"
                placeholder="Mô tả"
                value={cropdes}
                onChange={(e) => setCropDes(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="mt-1 text-red-500 text-xs italic">{cropdesErrol}</p>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button
              className="bg-red-600 hover:opacity-90 text-white text-xl font-bold py-2 px-4 rounded-xl w-1/3"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              className="bg-primary hover:bg-primary-700 text-white text-xl font-bold py-2 px-4 rounded-xl ml-5 w-1/3"
              onClick={() => {
                onUpdateCrop(crop.cropid);
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FarmerUpdateCrop.propTypes = {
  onClose: PropTypes.func,
  crop: PropTypes.object,
  userId: PropTypes.string,
  refreshCropList: PropTypes.func,
};
