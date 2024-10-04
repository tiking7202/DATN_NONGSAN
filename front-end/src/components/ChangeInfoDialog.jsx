import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/config";
import { formatDateInput } from "../utils/formatDate";

export default function ChangeInfoDialog({ onClose, user, refreshUser }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [fullname, setFullname] = useState(user.fullname);
  const [street, setStreet] = useState(user.street);
  const [commune, setCommune] = useState(user.commune);
  const [district, setDistrict] = useState(user.district);
  const [province, setProvince] = useState(user.province);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  const [indentitycard, setIndentitycard] = useState(user.indentitycard);
  const [dob, setDob] = useState(user.dob);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [communeError, setCommuneError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");
  const [indentitycardError, setIndentitycardError] = useState("");
  const [dobError, setDobError] = useState("");

  const validateForm = () => {
    if (!username) {
      setUsernameError("Vui lòng nhập tên đăng nhập.");
      return false;
    }
    if (!email) {
      setEmailError("Vui lòng nhập email.");
      return false;
    }
    if (!fullname) {
      setFullnameError("Vui lòng nhập họ và tên.");
      return false;
    }
    if (!street) {
      setStreetError("Vui lòng nhập địa chỉ.");
      return false;
    }
    if (!commune) {
      setCommuneError("Vui lòng nhập phường/xã.");
      return false;
    }
    if (!district) {
      setDistrictError("Vui lòng nhập quận/huyện.");
      return false;
    }
    if (!province) {
      setProvinceError("Vui lòng nhập tỉnh/thành phố.");
      return false;
    }
    if (!phonenumber) {
      setPhonenumberError("Vui lòng nhập số điện thoại.");
      return false;
    }
    if (!indentitycard) {
      setIndentitycardError("Vui lòng nhập số CCCD.");
      return false;
    }
    if (!dob) {
      setDobError("Vui lòng nhập ngày sinh.");
      return false;
    }
    return true;
  };

  const onChangeInfo = async () => {
    try {
      if (!validateForm()) return;
      // Gọi API thay đổi thông tin
      const response = await axios.put(`${API_BASE_URL}/user/change-info`, {
        userId: user.userid,
        username: username,
        email: email,
        fullname: fullname,
        street: street,
        commune: commune,
        district: district,
        province: province,
        phonenumber: phonenumber,
        indentitycard: indentitycard,
        dob: dob,
      });
      refreshUser();
      onClose();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error changing info:", error);
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
          Thay đổi thông tin
        </h2>
        <div className="p-3 my-2">
          <div className="bg-secondary m-3 flex">
            <div className="w-1/2">
              <label className="block text-xl text-primary font-bold mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <p className="text-red-500 italic">{usernameError}</p>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                placeholder="Nhập email"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 italic">{emailError}</p>
              )}
            </div>
          </div>
          <div className="bg-secondary m-3 flex">
            <div className="w-1/2">
              <label className="block text-xl text-primary font-bold mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              {fullnameError && (
                <p className="text-red-500 italic">{fullnameError}</p>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Tên đường
              </label>
              <input
                type="text"
                placeholder="Nhập tên đường"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              {streetError && (
                <p className="text-red-500 italic">{streetError}</p>
              )}
            </div>
          </div>
          <div className="bg-secondary m-3 flex">
            <div className="w-1/2">
              <label className="block text-xl text-primary font-bold mb-2">
                Phường/Xã
              </label>
              <input
                type="text"
                placeholder="Nhập phường/xã"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
              />
              {communeError && (
                <p className="text-red-500 italic">{communeError}</p>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Quận/Huyện
              </label>
              <input
                type="text"
                placeholder="Nhập quận/huyện"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              {districtError && (
                <p className="text-red-500 italic">{districtError}</p>
              )}
            </div>
          </div>
          <div className="bg-secondary m-3 flex">
            <div className="w-1/2">
              <label className="block text-xl text-primary font-bold mb-2">
                Tỉnh/Thành phố
              </label>
              <input
                type="text"
                placeholder="Nhập tỉnh/thành phố"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
              {provinceError && (
                <p className="text-red-500 italic">{provinceError}</p>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              {phonenumberError && (
                <p className="text-red-500 italic">{phonenumberError}</p>
              )}
            </div>
          </div>
          <div className="bg-secondary m-3 flex">
            <div className="w-1/2">
              <label className="block text-xl text-primary font-bold mb-2">
                Số CCCD
              </label>
              <input
                type="text"
                placeholder="Nhập số CCCD"
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                value={indentitycard}
                onChange={(e) => setIndentitycard(e.target.value)}
              />
              {indentitycardError && (
                <p className="text-red-500 italic">{indentitycardError}</p>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Ngày sinh
              </label>
              <input
                type="date"
                value={formatDateInput(dob)}
                onChange={(e) => setDob(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              {dobError && <p className="text-red-500 italic">{dobError}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button
              className="bg-primary hover:opacity-90 text-white font-bold py-2 px-3 m-3 rounded-lg"
              onClick={onChangeInfo}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ChangeInfoDialog.propTypes = {
  onClose: PropTypes.func,
  user: PropTypes.object,
  refreshUser: PropTypes.func,
};
