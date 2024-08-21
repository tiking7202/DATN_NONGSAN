import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../../config/config";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";

export default function FarmerProfile() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;

  const [farmerData, setFarmerData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/farmer/profile/${userId}`)
      .then((response) => {
        setFarmerData(response.data);
        setUpdatedData(response.data);
        console.log("Dữ liệu farmer lấy thành công: ", response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!updatedData.email) newErrors.email = "Email không được bỏ trống.";
    if (!updatedData.username)
      newErrors.username = "Tên đăng nhập không được bỏ trống.";
    if (!updatedData.fullname)
      newErrors.fullname = "Họ và tên không được bỏ trống.";
    if (!updatedData.dob) newErrors.dob = "Ngày sinh không được bỏ trống.";
    if (!updatedData.phonenumber)
      newErrors.phonenumber = "Số điện thoại không được bỏ trống.";
    if (!updatedData.indentitycard)
      newErrors.indentitycard = "Số CMND/CCCD không được bỏ trống.";
    if (
      !updatedData.street ||
      !updatedData.commune ||
      !updatedData.district ||
      !updatedData.province
    )
      newErrors.address = "Địa chỉ không được bỏ trống.";
    return newErrors;
  };

  const handleUpdate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    axios
      .put(`${API_BASE_URL}/farmer/profile/${userId}`, updatedData)
      .then((response) => {
        setFarmerData(response.data);
        alert("Thông tin đã được cập nhật thành công");
        setErrors({});
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật:", error);
        alert("Có lỗi xảy ra khi cập nhật thông tin");
      });
  };

  if (!farmerData) return <div>Loading .....</div>;

  const address = `${updatedData.street || ""}, ${updatedData.commune || ""}, ${
    updatedData.district || ""
  }, ${updatedData.province || ""}`;

  return (
    <div>
      <HeaderFarmer />
      <FarmerNavBar />
      <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20 p-6">
        <div className="bg-white pt-3 pr-6 pl-6 pb-6 rounded-lg shadow-md flex w-full mb-10">
          <div className="w-2/3 pr-6">
            <p>
              <strong>Email:</strong>{" "}
              <input
                type="email"
                name="email"
                value={updatedData.email || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </p>
            <p>
              <strong>Tên đăng nhập:</strong>{" "}
              <input
                type="text"
                name="username"
                value={updatedData.username || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username}</span>
              )}
            </p>
            <p>
              <strong>Họ và tên:</strong>{" "}
              <input
                type="text"
                name="fullname"
                value={updatedData.fullname || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.fullname && (
                <span className="text-red-500">{errors.fullname}</span>
              )}
            </p>
            <p>
              <strong>Ngày sinh:</strong>{" "}
              <input
                type="date"
                name="dob"
                value={
                  updatedData.dob
                    ? new Date(updatedData.dob).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.dob && <span className="text-red-500">{errors.dob}</span>}
            </p>
            <p>
              <strong>Số điện thoại:</strong>{" "}
              <input
                type="text"
                name="phonenumber"
                value={updatedData.phonenumber || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.phonenumber && (
                <span className="text-red-500">{errors.phonenumber}</span>
              )}
            </p>
            <p>
              <strong>Số CMND/CCCD:</strong>{" "}
              <input
                type="text"
                name="indentitycard"
                value={updatedData.indentitycard || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.indentitycard && (
                <span className="text-red-500">{errors.indentitycard}</span>
              )}
            </p>
            <p className="mb-2">
              <strong>Địa chỉ:</strong>{" "}
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => {
                  const [street, commune, district, province] = e.target.value
                    .split(",")
                    .map((part) => part.trim());
                  setUpdatedData((prevData) => ({
                    ...prevData,
                    street,
                    commune,
                    district,
                    province,
                  }));
                }}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address}</span>
              )}
            </p>

            <div className="flex justify-end">
              <button
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
          <div className="w-px bg-gray-300 mx-6"></div>
          <div className="w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img
                src="/path-to-avatar-image" // Replace with the actual path to the avatar image
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="text-primary mt-4 underline hover:text-primary-dark"
              onClick={() => alert("Change Avatar")}
            >
              Thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
