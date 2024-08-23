import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../App.css";
import { API_BASE_URL } from "../../../../config/config";
import { toast, ToastContainer } from "react-toastify";
import { useToast } from "../../../../../context/ToastContext";

const RegisterCustomerStep2 = () => {
  const navigate = useNavigate();
  // Khai báo các state cần thiết dùng để lưu thông tin nhập vào từ form
  const [street, setStreet] = useState("");
  const [commune, setCommune] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [avatar, setAvatar] = useState("");

  // state dùng để lưu thông báo lỗi
  const [streetError, setStreetError] = useState("");
  const [communeError, setCommuneError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [identityCardError, setIdentityCardError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [avatarError, setAvatarError] = useState("");


  const validate = () => {
    let isValid = true;

    if (!street) {
      setStreetError("Tên đường là bắt buộc");
      isValid = false;
    } else {
      setStreetError("");
    }

    if (!commune) {
      setCommuneError("Tên phường/xã là bắt buộc");
      isValid = false;
    } else {
      setCommuneError("");
    }

    if (!district) {
      setDistrictError("Quận/Huyện là bắt buộc");
      isValid = false;
    } else {
      setDistrictError("");
    }

    if (!province) {
      setProvinceError("Tỉnh/Thành phố là bắt buộc");
      isValid = false;
    } else {
      setProvinceError("");
    }

    if (!identityCard) {
      setIdentityCardError("Số CMND là bắt buộc");
      isValid = false;
    } else {
      setIdentityCardError("");
    }
    if(!dateOfBirth){
      setDateOfBirthError("Ngày sinh là bắt buộc");
      isValid = false;
    } else {
      setDateOfBirthError("");
    }
    if (!avatar) {
      setAvatarError("Ảnh đại diện là bắt buộc");
      isValid = false;
    } else {
      setAvatarError("");
    }
    return isValid;
  };

  const { setToastMessage } = useToast();

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userid");
  const handleSubmit = async () => {
    try {
      if (!validate()) {
        return;
      }
      const additionalData = {
        address: {
          street,
          commune,
          district,
          province,
        },
        identityCard,
        dateOfBirth,
        avatar,
        status: "true"
      };
      const response = await axios.post(
        `${API_BASE_URL}/auth/register/step2/${userId}`,
        additionalData
      );
      setToastMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data, {
        position: "top-right",
        time: 500,
      });
    }
  };

  return (
    <div className="backgroundImg">
      <ToastContainer />
      <div className="w-2/5 m-auto bg-fourth rounded-2xl">
        <h1 className="text-primary py-3 font-bold text-center text-40">
          Đăng ký
        </h1>
        <div className="flex justify-center px-5 my-3">
          <div className="bg-secondary w-6/12 mx-2 rounded-xl p-2">
            <label
              htmlFor="street"
              className="block text-xl text-primary font-bold mb-2"
            >
              Tên đường:
            </label>
            <input
              id="street"
              type="text"
              placeholder="Tên đường"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
            />
            {streetError && <p className="text-red-500 italic">{streetError}</p>}
          </div>
          <div className="bg-secondary w-6/12 mx-2 rounded-xl p-2">
            <label
              htmlFor="commune"
              className="block text-xl text-primary font-bold mb-2"
            >
              Phường/Xã:
            </label>
            <input
              id="commune"
              type="text"
              placeholder="Tên phường/xã"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
            />
            {communeError && <p className="text-red-500 italic">{communeError}</p>}
          </div>
        </div>
        <div className="flex justify-center px-5 my-3">
          <div className="bg-secondary w-6/12 mx-2 rounded-xl p-2">
            <label
              htmlFor="district"
              className="block text-xl text-primary font-bold mb-2"
            >
              Quận/Huyện:
            </label>
            <input
              id="district"
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
            />
            {districtError && <p className="text-red-500 italic">{districtError}</p>}
          </div>
          <div className="bg-secondary w-6/12 mx-2 rounded-xl p-2">
            <label
              htmlFor="province"
              className="block text-xl text-primary font-bold mb-2"
            >
              Tỉnh/Thành phố:
            </label>
            <input
              id="province"
              type="text"
              placeholder="Tỉnh/Thành phố"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
            />
            {provinceError && <p className="text-red-500 italic">{provinceError}</p>}
          </div>
        </div>
        <div className="flex justify-center px-5 my-3">
          <div className="bg-secondary w-6/12 mx-2 rounded-xl p-2">
            <label
              htmlFor="identityCard"
              className="block text-xl text-primary font-bold mb-2"
            >
              Số CMND/CCCD:
            </label>
            <input
              id="identityCard"
              type="text"
              placeholder="Số CMND/CCCD"
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value)}
              className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
            />
            {identityCardError && (
              <p className="text-red-500 italic">{identityCardError}</p>
            )}
          </div>
          <div className="bg-secondary w-6/12 mx-2 rounded-xl p-2">
            <label
              htmlFor="identityCard"
              className="block text-xl text-primary font-bold mb-2"
            >
              Ngày sinh
            </label>
            <input
              className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              type="date"
              placeholder="Ngày sinh"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {dateOfBirthError && (
              <p className="text-red-500 italic">{dateOfBirthError}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center px-5 my-3">
          <div className="bg-secondary w-full mx-2 rounded-xl p-2">
            <label
              htmlFor="identityCard"
              className="block text-xl text-primary font-bold mb-2"
            >
              Chọn ảnh đại diện:
            </label>
            <input
              className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              type="text"
              placeholder="Chọn ảnh đại diện"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            {avatarError && (
              <p className="text-red-500 italic">{avatarError}</p>
            )}
          </div>
        </div>
        <div className="flex items-center flex-col m-5">
          <button
            onClick={handleSubmit}
            className="bg-primary hover:opacity-90 text-white font-bold text-xl py-2 px-6 m-3 rounded-xl w-1/2"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomerStep2;
