import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from './../../../../config/config';
import { useToast } from "../../../../context/ToastContext";

export default function FarmerRegisterStep2() {
  const [farmName, setFarmName] = useState("");
  const [farmType, setFarmType] = useState("");
  const [farmemail, setFarmemail] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [farmDescription, setFarmDescription] = useState("");
  // const [address, setAddress] = useState("");
  const [farmstreet, setStreet] = useState("");
  const [farmcommune, setCommune] = useState("");
  const [farmdistrict, setDistrict] = useState("");
  const [farmprovince, setProvince] = useState("");

  const [farmNameError, setFarmNameError] = useState("");
  const [farmTypeError, setFarmTypeError] = useState("");
  const [farmemailError, setFarmemailError] = useState("");
  const [farmAreaError, setFarmAreaError] = useState("");
  const [farmDescriptionError, setFarmDescriptionError] = useState("");

  const [streetError, setStreetError] = useState("");
  const [communeError, setCommuneError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [provinceError, setProvinceError] = useState("");

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userid");
  const navigate = useNavigate();
  const { toastMessage, setToastMessage } = useToast();
  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      setToastMessage(null);
    }
  }, [toastMessage, setToastMessage, navigate]);

  const validate = () => {
    let isValid = true;

    // Reset errors
    setFarmNameError("");
    setFarmTypeError("");
    setFarmemailError("");
    setFarmAreaError("");
    setFarmDescriptionError("");

    if (farmName.trim() === "") {
      setFarmNameError("Vui lòng nhập tên trang trại");
      isValid = false;
    }

    // Validate farm type
    if (farmType.trim() === "") {
      setFarmTypeError("Vui lòng nhập loại trang trại");
      isValid = false;
    }

    // Validate contact name
    if (farmemail.trim() === "") {
      setFarmemailError("Vui lòng nhập tên người liên hệ");
      isValid = false;
    }

    // Validate ID number

    // Validate farm scale
    if (farmArea.trim() === "") {
      setFarmAreaError("Vui lòng nhập quy mô trang trại");
      isValid = false;
    }

    // Validate farm description
    if (farmDescription.trim() === "") {
      setFarmDescriptionError("Vui lòng nhập mô tả trang trại");
      isValid = false;
    }

    if (!farmstreet) {
      setStreetError("Tên đường là bắt buộc");
      isValid = false;
    } else {
      setStreetError("");
    }

    if (!farmcommune) {
      setCommuneError("Tên phường/xã là bắt buộc");
      isValid = false;
    } else {
      setCommuneError("");
    }

    if (!farmdistrict) {
      setDistrictError("Quận/Huyện là bắt buộc");
      isValid = false;
    } else {
      setDistrictError("");
    }

    if (!farmprovince) {
      setProvinceError("Tỉnh/Thành phố là bắt buộc");
      isValid = false;
    } else {
      setProvinceError("");
    }
    return isValid;
  };

  const handleNext = async () => {
    // Validate input fields here
    try {
      if (!validate()) {
        return;
      }
      const farmData = {
        farmName,
        farmType,
        farmemail,
        farmstreet,
        farmcommune,
        farmdistrict,
        farmprovince,
        farmArea,
        farmDescription,
      };

      // Gửi yêu cầu API cho giai đoạn 1 (nhập thông tin cơ bản)
      const response = await axios.post(
        `${API_BASE_URL}/auth/farmer/register/step2/${userId}`,
        farmData
      );

      const farmId = response.data.farmid;
      
      // Điều hướng sang trang nhập thông tin phụ
      setToastMessage("Đăng ký trang trại thành công");
      navigate(`/farmer/register/step3?farmId=${farmId}`);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data, {
        position: "top-right",
        time: 500,
      });
    }
  };

  
  return (
    <div className="h-screen bg-fourth flex flex-col">
      <ToastContainer />
      <div className=" bg-fourth px-10 py-3">
        <div className="bg-white flex flex-col py-2 ml-10 mr-10 rounded-full ">
          <p className="text-center text-2xl ">
            ĐĂNG KÝ ĐỂ ĐƯA NÔNG SẢN CỦA BẠN ĐẾN VỚI NGƯỜI TIÊU DÙNG KHẮP NƠI
            TRÊN LÃNH THỔ VIỆT NAM
          </p>
        </div>

        {/* Register form */}
        <div className="bg-white mt-5 ml-10 mr-10 flex justify-center py-10 rounded-xl">
          {/* Icon tài khoản */}
          <div className="mr-40 relative flex flex-col items-center">
            {/* Icon */}
            <FontAwesomeIcon icon={faUser} className="text-gray-500 text-4xl" />
            <p className="text-center mt-2">Đăng ký tài khoản</p>
            {/* Đường kẻ */}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 h-0.5 bg-gray-500 w-40  "></div>
          </div>

          {/* Icon giỏ hàng */}
          <div className="mr-40 relative flex flex-col items-center">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faShoppingCart}
              className=" text-green-600 text-4xl"
            />
            <p className="text-center text-green-600 mt-2">Đăng ký trang trại</p>
            {/* Đường kẻ */}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 h-0.5 bg-gray-500 w-40"></div>
          </div>

          {/* Icon hoàn thành */}
          <div className="relative flex flex-col items-center">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-gray-500 text-4xl"
            />
            <p className="text-center mt-2">Hoàn thành</p>
          </div>
        </div>

        <div className="flex  ml-10 mr-10 mb-5 py-5 px-10 rounded-xl">
          {/* Left section - Input form */}
          <div className="w-1/2 pr-4 bg-white p-6  mr-5 rounded-lg text-white">
            {/* Form fields */}
            <div className="mb-4">
              <label
                htmlFor="farmName"
                className="block text-gray-700 font-bold mb-2"
              >
                Tên trang trại:
              </label>
              <input
                type="text"
                id="farmName"
                placeholder="Tên trang trại"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {farmNameError && (
                <p className="text-red-500 text-sm italic">{farmNameError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmType"
                className="block text-gray-700 font-bold mb-2"
              >
                Loại trang trại:
              </label>
              <input
                type="text"
                id="farmType"
                placeholder="Loại trang trại"
                value={farmType}
                onChange={(e) => setFarmType(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {farmTypeError && (
                <p className="text-red-500 text-sm italic">{farmTypeError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmemail"
                className="block text-gray-700 font-bold mb-2"
              >
                Email trang trại:
              </label>
              <input
                type="text"
                id="farmemail"
                placeholder="Email của trang trại"
                value={farmemail}
                onChange={(e) => setFarmemail(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {farmemailError && (
                <p className="text-red-500 text-sm italic">{farmemailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="farmstreet"
                className="block text-gray-700 font-bold mb-2"
              >
                Tên đường:
              </label>
              <input
                type="text"
                id="farmstreet"
                placeholder="Tên đường"
                value={farmstreet}
                onChange={(e) => setStreet(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {streetError && (
                <p className="text-red-500 text-sm italic">{streetError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmommune"
                className="block text-gray-700 font-bold mb-2"
              >
                Tên xã/phường:
              </label>
              <input
                type="text"
                id="farmcommune"
                placeholder="Xã/Phường"
                value={farmcommune}
                onChange={(e) => setCommune(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {communeError && (
                <p className="text-red-500 text-sm italic">{communeError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmdistrict"
                className="block text-gray-700 font-bold mb-2"
              >
                Tên quận/huyện:
              </label>
              <input
                type="text"
                id="farmdistrict"
                placeholder="Quận/Huyện"
                value={farmdistrict}
                onChange={(e) => setDistrict(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {districtError && (
                <p className="text-red-500 text-sm italic">{districtError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmprovince"
                className="block text-gray-700 font-bold mb-2"
              >
                Tên tỉnh/thành phố:
              </label>
              <input
                type="text"
                id="farmprovince"
                placeholder="Tỉnh/Thành phố"
                value={farmprovince}
                onChange={(e) => setProvince(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {provinceError && (
                <p className="text-red-500 text-sm italic">{provinceError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmArea"
                className="block text-gray-700 font-bold mb-2"
              >
                Quy mô trang trại:
              </label>
              <input
                type="text"
                id="farmArea"
                placeholder="Quy mô trang trại (m2)"
                value={farmArea}
                onChange={(e) => setFarmArea(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full bg-ebffeb text-gray-500"
              />
              {farmAreaError && (
                <p className="text-red-500 text-sm italic">{farmAreaError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmDescription"
                className="block text-gray-700 font-bold mb-2"
              >
                Mô tả trang trại:
              </label>
              <textarea
                id="farmDescription"
                placeholder="Mô tả trang trại"
                value={farmDescription}
                onChange={(e) => setFarmDescription(e.target.value)}
                className="border border-gray-500 rounded-2xl py-2 px-3 w-full h-40 bg-ebffeb resize-none text-gray-500"
              ></textarea>
              {farmDescriptionError && (
                <p className="text-red-500 text-sm italic">{farmDescriptionError}</p>
              )}
            </div>

            <div className="flex mt-4 w-full justify-end">
              <button
                onClick={handleNext}
                className="bg-primary text-white font-bold hover:opacity-95 py-2 w-full px-4 rounded-xl"
              >
                Tiếp tục
              </button>
            </div>
          </div>

          {/* Right section - Image and text */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              ĐĂNG KÝ THÔNG TIN TRANG TRẠI
            </h2>
            <p className="text-gray-600 text-xl mb-6 text-center">
              Hãy điền thông tin chi tiết về trang trại của bạn để bắt đầu hành
              trình cung cấp sản phẩm tươi ngon đến người tiêu dùng.
            </p>
            <img
              src="/src/assets/logimFarmer.jpg"
              alt="Đăng ký"
              className="rounded-lg w-3/4 h-1/2 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
