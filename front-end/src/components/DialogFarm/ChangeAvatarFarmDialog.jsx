import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/config";
import { jwtDecode } from "jwt-decode"; 
import Loading from "../Loading";

export default function ChangeLogoDialog({ onClose, user, refreshUser }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarError, setAvatarError] = useState("");
  const [loading, setLoading] = useState(false); 

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;

  const validateForm = () => {
    let isvalid = true;

    if (!avatar) {
      setAvatarError("Avatar là bắt buộc");
      isvalid = false;
    }
    return isvalid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true); 
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await axios.put(
        `${API_BASE_URL}/farms/update/avatar/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
      toast.success("Cập nhật logo thành công");
      refreshUser();
      response
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
          Thay đổi ảnh đại diện
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
                    htmlFor="avatar"
                  >
                    Ảnh đại diện
                  </label>
                  <input
                    type="file"
                    placeholder="Ảnh đại diện nông dân"
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                  {avatarError && (
                    <p className="text-red-500 italic">{avatarError}</p>
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
  user: PropTypes.object,
  refreshUser: PropTypes.func,
};