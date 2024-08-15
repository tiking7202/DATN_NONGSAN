import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import imgLogin from "../../../assets/logimFarmer.jpg";
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
import { useToast } from "../../../../context/ToastContext";
import { jwtDecode } from "jwt-decode";

export default function FarmerLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const { toastMessage, setToastMessage } = useToast();
  useEffect(() => {
    // Xóa token khỏi localStorage nếu có
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    if (toastMessage) {
      toast.success(toastMessage, {
        position: "top-right",
        time: 500,
      });
      setToastMessage(null);
    }
  }, [toastMessage, setToastMessage]);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.usernameOrEmail || !credentials.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập.", {
        position: "top-right",
        time: 500,
      });
      return;
    }

    // Call API here
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      // Hiển thị thông báo đăng nhập thành công
      if (response.status === 200) {
        //lay token và giai ma token
        const decodedToken = jwtDecode(response.data.accessToken);
        const role = decodedToken?.role;
        if (role !== "farmer") {
          toast.error("Đây không phải là tài khoản nông dân");
          return;
        }

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        
        setToastMessage("Đăng nhập thành công");
        callProtectedApi();
        // Điều hướng người dùng đến trang chính
        navigate("/farmer");
      }
      // De tranh loi thoi
      if (response.status === 201) getAuthToken();
    } catch (error) {
      // Hiển thị thông báo đăng nhập thất bại
      toast.error(error.response.data, {
        position: "top-right",
        time: 500,
      });
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });
      localStorage.setItem("accessToken", response.data.token);
      return response.data.accessToken;
    } catch (error) {
      console.error("Refresh token error:", error);
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
        position: "top-right",
        time: 500,
      });
      navigate("/login");
    }
  };

  const getAuthToken = async () => {
    let token = localStorage.getItem("accessToken");
    // Check if token is expired and refresh if necessary
    if (isTokenExpired(token)) {
      token = await refreshToken();
    }
    return token;
  };
  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  };

  // Hàm để gọi API với Bearer token
  const callProtectedApi = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.", {
        position: "top-right",
        time: 500,
      });
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/protected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Protected data:", response.data);
    } catch (error) {
      console.error("Error calling protected API:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
          position: "top-right",
          time: 500,
        });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.", {
          position: "top-right",
          time: 500,
        });
      }
    }
  };

  return (
    <div className="h-screen bg-fourth p-2 flex items-center justify-center">
      <ToastContainer />
      <div className="w-2/3 m-auto shadow-lg bg-secondary rounded-2xl flex">
        <div className="text-primary w-2/3 flex items-center justify-center">
          <div className="w-11/12 h-1/3 m-auto flex flex-col justify-center">
            <h2 className=" text-3xl text-center font-bold my-3 pt-5">
              TRỞ THÀNH ĐỐI TÁC VỚI AGRIMART
            </h2>
            <div className="ml-5 mb-3 text-center text-lg font-medium">
              Cung cấp sản phẩm của bạn trên hệ thống của chúng tôi và tiếp cận
              hàng ngàn khách hàng tiềm năng. Đăng ký ngay để trở thành đối tác của chúng tôi.
            </div>
            <img src={imgLogin} alt="farmer" className="w-7/12 m-auto my-2 rounded-lg" />
          </div>
        </div>
        <div className="w-1/3 shadow-2xl">
          <h1 className="text-primary pt-5 font-bold text-center text-3xl">
            Đăng Nhập
          </h1>
          <div className="my-2">
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
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
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
                  className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-3 cursor-pointer"
                />
              </div>
              <div className="flex justify-between my-3">
                <div>
                  <input type="checkbox" className="mr-2" />
                  <label className="text-primary">Ghi nhớ mật khẩu</label>
                </div>
                <a href="/forgot-password" className="text-primary">
                  Quên mật khẩu?
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-col mx-5 mb-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 m-3 rounded-xl w-full"
            >
              Đăng nhập
            </button>
            <p className="text-primary text-xl m-2">Hoặc</p>
            <button className="bg-third hover:opacity-90 text-white font-bold py-2 px-4 m-3 rounded-xl w-full">
              Đăng nhập với google
            </button>
            <p className="text-primary">
              Bạn chưa có tài khoản?{" "}
              <Link className="text-third" to="/register/step1">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
