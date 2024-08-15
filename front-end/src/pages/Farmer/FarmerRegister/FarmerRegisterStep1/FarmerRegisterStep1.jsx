import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faCheckCircle,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import "../../../../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function FarmerRegisterStep1() {
  // Khởi tạo các biến và cách nhập
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [indentitycard, setIndentitycard] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // khởi tạo tb lỗi
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");
  const [indentitycardError, setIndentitycardError] = useState("");
  const [dobError, setDobError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    if (username === "") {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (email === "") {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (confirmPassword === "" || confirmPassword !== password) {
      setConfirmPasswordError("Confirm password is required or does not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
    if (fullname === "") {
      setFullnameError("Full name is required");
      isValid = false;
    } else {
      setFullnameError("");
    }
    if (indentitycard === "") {
      setIndentitycardError("Address is required");
      isValid = false;
    } else {
      setIndentitycardError("");
    }
    if (dob === "") {
      setDobError("Date of birth is required");
      isValid = false;
    } else {
      setDobError("");
    }
    if (phonenumber === "") {
      setPhonenumberError("Phone number is required");
      isValid = false;
    } else {
      setPhonenumberError("");
    }
    return isValid;
  };

  // Xử lý hiện thị password khi nhập
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Xử lý bước tiếp theo
  const handleNext = async () => {
    try {
      if (!validate()) {
        return;
      }
      const userData = {
        username,
        email,
        password,
        fullname,
        dob,
        phonenumber,
        indentitycard,
        role: "farmer",
        status: "false",
      };

      // Gửi yêu cầu API cho giai đoạn 1 (nhập thông tin cơ bản)
      const response = await axios.post(
        "http://localhost:3000/api/auth/farmer/register/step1",
        userData
      );
      const userId = response.data.userid;
      console.log("User ID:", userId);
      // Điều hướng sang trang nhập thông tin phụ
      navigate(`/farmer/register/step2?userid=${userId}`);
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
      <div className="bg-fourth px-10 py-3">
        <div className="bg-white flex flex-col py-2  ml-10 mr-10 rounded-full ">
          <p className="text-center text-2xl">
            ĐĂNG KÝ ĐỂ ĐƯA NÔNG SẢN CỦA BẠN ĐẾN VỚI NGƯỜI TIÊU DÙNG KHẮP NƠI
            TRÊN LÃNH THỔ VIỆT NAM
          </p>
        </div>

        {/* Register form */}
        <div className="bg-white mt-5 ml-10 mr-10 flex justify-center py-10 rounded-xl">
          {/* Icon tài khoản */}
          <div className="mr-40 relative flex flex-col items-center">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faUser}
              className="text-green-600 text-4xl"
            />
            <p className="text-center text-green-600 mt-2">Đăng ký tài khoản</p>
            {/* Đường kẻ */}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 h-0.5 bg-gray-500 w-40"></div>
          </div>

          {/* Icon giỏ hàng */}
          <div className="mr-40 relative flex flex-col items-center">
            {/* Icon */}
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-gray-500 text-4xl"
            />
            <p className="text-center mt-2">Đăng ký gian hàng</p>
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

        {/* Nhập thông tin */}
        <div className="flex ml-10 mr-10 mb-5 py-5 px-10 rounded-xl">
          {/* Left Block - Form */}
          <div className="w-1/2 bg-white p-6 rounded-lg text-white">
            <div className="w-full pr-4">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500"
                />
                {emailError && (
                  <p className="text-gray-900 text-sm">{emailError}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500"
                />
                {usernameError && (
                  <p className="text-gray-900  text-sm">{usernameError}</p>
                )}
              </div>
              <div className="mb-3 relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Mật khẩu:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500 pr-10" // Add padding to the right
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={handlePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm text-gray-500"
                  />
                </div>
                {passwordError && (
                  <p className="text-gray-900 text-sm">{passwordError}</p>
                )}
              </div>

              <div className="mb-3 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Xác nhận mật khẩu:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500 pr-10" // Add padding to the right
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={(e) =>
                      handlePasswordVisibility(e, "confirmPassword")
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm text-gray-500"
                  />
                </div>
                {confirmPasswordError && (
                  <p className="text-gray-900 text-sm">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="fullname"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Họ và tên:
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Họ và tên"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500"
                />
                {fullnameError && (
                  <p className="text-gray-900 text-sm">{fullnameError}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="dob"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Ngày tháng năm sinh:
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500"
                />
                {dobError && (
                  <p className="text-gray-900 text-sm">{dobError}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  Số điện thoại:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Số điện thoại"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500"
                />
                {phonenumberError && (
                  <p className="text-gray-900 text-sm">{phonenumberError}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="indentitycard"
                  className="block text-gray-700 font-bold mb-2 text-sm"
                >
                  CCCD/CMND:
                </label>
                <input
                  type="text"
                  id="indentitycard"
                  placeholder="CCCD/CMND"
                  value={indentitycard}
                  onChange={(e) => setIndentitycard(e.target.value)}
                  className="border border-gray-500 rounded-md py-1 px-2 w-full bg-ebffeb text-gray-500"
                />
                {indentitycardError && (
                  <p className="text-gray-900 text-sm">{indentitycardError}</p>
                )}
              </div>
              <div className="flex justify-center w-full">
                <button
                  onClick={handleNext}
                  className="bg-primary text-gray- py-2 px-4 rounded-md text-sm"
                >
                  Tiếp tục
                </button>
              </div>

              <div className="flex justify-center w-full mt-2">
                <p className="text-gray-900 text-sm">Hoặc</p>
              </div>

              <div className="flex justify-center w-full mt-2">
                <button
                  onClick={handleNext}
                  className="bg-gray-800 text-white py-2 px-4 rounded-md text-sm"
                >
                  Đăng ký với Google
                </button>
              </div>

              <div className="flex justify-center w-full mt-4">
                <p className="text-sm text-gray-700">
                  Đã có tài khoản bán hàng?{" "}
                  <a href="/farmer/login" className="text-blue-500 underline">
                    Đăng nhập
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Block - Text and Image */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6">
            <div className="mb-4 text-center">
              <p className="font-bold text-2xl text-primary">
                ĐĂNG KÝ BÁN HÀNG CÙNG AGRIMART
              </p>
              <p className="text-gray-700 mt-2 text-xl">
                Với mục tiêu tiếp cận hàng ngàn khách hàng, tăng cường thương
                hiệu nông trại và nâng cao doanh thu, đồng thời góp phần xây
                dựng nền nông nghiệp bền vững
              </p>
            </div>
            <img
              src="/src/assets/logimFarmer.jpg"
              alt="Đăng ký"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerRegisterStep1;
