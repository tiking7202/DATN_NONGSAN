import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/config";
import Loading from "../Loading";

export default function ChangeLogoDialog({ onClose, farm, refreshFarm }) {
  const [farmlogo, setFarmLogo] = useState(farm.farmlogo);
  const farmname = farm.farmname;
  const farmId = farm.farmid;
  const [farmlogoError, setFarmLogoError] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading

  const validateForm = () => {
    let isvalid = true;

    if (!farmlogo) {
      setFarmLogoError("Logo is required");
      isvalid = false;
    }
    return isvalid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true); // Bắt đầu loading
    try {
      const formData = new FormData();
      formData.append("farmlogo", farmlogo);
      formData.append("farmId", farmId);
      formData.append("farmname", farmname);
      const response = await axios.put(
        `${API_BASE_URL}/farms/updatelogo/${farmId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success("Thay đổi logo trang trại thành công");
        refreshFarm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-4 rounded-lg w-1/2 m-auto text-primary h-7/12 overflow-auto shadow-xl border border-primary">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold mb-4">
          Thay đổi logo trang trại
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <Loading />
          </div>
        ) : (
          <>
            <div className="p-3 my-2">
              <div className="bg-secondary m-3 flex">
                <div className="w-full">
                  <label
                    className="block text-xl text-primary font-bold mb-2"
                    htmlFor="farmlogo"
                  >
                    Logo trang trại
                  </label>
                  <input
                    type="file"
                    placeholder="Logo trang trại"
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    onChange={(e) => setFarmLogo(e.target.files[0])}
                  />
                  {farmlogoError && (
                    <p className="text-red-500 italic">{farmlogoError}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <button
                  className="bg-primary hover:opacity-90 text-white font-bold py-2 px-3 m-3 rounded-lg"
                  onClick={handleSubmit}
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ChangeLogoDialog.propTypes = {
  onClose: PropTypes.func,
  farm: PropTypes.object,
  refreshFarm: PropTypes.func,
};
