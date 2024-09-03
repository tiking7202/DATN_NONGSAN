import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { toast, ToastContainer } from 'react-toastify';
import { API_BASE_URL } from "../config/config";
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../context/ToastContext";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {toastMessage,setToastMessage} = useToast();


  useEffect (() => {
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, [toastMessage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.usernameOrEmail || !credentials.password) {
      console.log("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }
    
    // Call API here
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/distributor/login`,
        credentials
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setToastMessage("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      // Hiển thị thông báo đăng nhập thất bại
      console.log(error);
    }
  }

  return (
    <div className="h-screen bg-fourth p-2 flex items-center justify-center">
      <ToastContainer />
      <div className="w-1/3 m-auto bg-white rounded-xl shadow-2xl p-3">
        <h1 className="text-primary font-bold text-center text-2xl">
          Đăng nhập cho nhà phân phối
        </h1>
        <div className="p-3">
          <div className="bg-secondary mx-2 rounded-t-xl p-2">
            <label
              htmlFor="usernameOrEmail"
              className="block text-xl text-primary font-bold mb-2"
            >
              Username hoặc email
            </label>
            <input
              type="text"
              placeholder="Username hoặc email"
              name="usernameOrEmail"
              value={credentials.usernameOrEmail}
              onChange={handleChange}
              className="bg-secondary text-base text-primary p-2 rounded-lg w-full border border-gray-500"
            />
          </div>
          <div className="bg-secondary mx-2 rounded-b-xl p-2">
            <label
              htmlFor="usernameOrEmail"
              className="block text-xl text-primary font-bold mb-2"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={credentials.password}
                onChange={handleChange}
                className="bg-secondary text-base text-primary p-2 rounded-lg w-full border border-gray-500"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handlePasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer"
              />
            </div>
            
          </div>
          <div className="flex items-center flex-col mx-5 my-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 m-2 rounded-lg w-full"
          >
            Đăng nhập
          </button>
          </div>

        </div>
      </div>
    </div>
  );
}
