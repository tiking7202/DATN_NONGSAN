import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useToast } from "../../../../context/ToastContext";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { isFarmer } from "../../../utils/roleCheck";

export default function HeaderFarmer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/farmer/login");
    }

    //Kiểm tra có phải là customer hay không
    if (token) {
      const decodedToken = jwtDecode(token);
      setFullName(decodedToken?.fullname);
      setAvatar(decodedToken?.avatar);
      if (!isFarmer(token)) {
        localStorage.removeItem("accessToken");
        navigate("/farmer/login");
      }
    }
  }, [token, navigate]);

  //set toast khi logout
  const { setToastMessage } = useToast();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/logout`);
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToastMessage("Đăng xuất thành công!");

        navigate("/farmer/login");
        // console.log(response);
      } else {
        toast.error("Đăng xuất thất bại. Vui lòng thử lại.", {
          position: "top-right",
          time: 500,
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error, {
        position: "top-right",
        time: 500,
      });
    }
  };

  return (
    <header className="z-40 p-3 bg-primary text-white px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed top-0 w-full">
      <ToastContainer />
      <nav className="flex justify-between w-full m-auto py-2">
        <section className="flex flex-col sm:flex-row items-center">
          <h1 className="font-bold text-3xl sm:text-4xl mx-2 sm:mx-5">
            <Link to="/farmer">AgriMart</Link>
          </h1>
          <div className="text-2xl font-extralight">
            <p>Kênh nhà cung cấp</p>
          </div>
        </section>
        <section className="flex space-x-2 text-xl">
          <div className="flex items-center cursor-pointer mx-5">
            <FontAwesomeIcon icon={faBell} />
            {/* <p>Thông báo</p> */}
          </div>

          <div className="flex items-center ml-3">
            <div className="relative inline-block text-left">
              <div
                className="cursor-pointer flex"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <p className="ml-2">{fullName}</p>
              </div>

              {isOpen && (
                <div className="z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    style={{ zIndex: 9999 }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="/farmer"
                      className="block px-4 py-2 text-lg text-primary hover:bg-fourth hover:font-bold"
                      role="menuitem"
                    >
                      Thay đổi thông tin
                    </a>
                    <a
                      href="/farmer"
                      className="block px-4 py-2 text-lg text-primary hover:bg-fourth hover:font-bold"
                      role="menuitem"
                    >
                      Thay đổi mật khẩu
                    </a>
                    <a
                      href="/farmer"
                      className="block px-4 py-2 text-lg text-primary hover:bg-fourth hover:font-bold"
                      role="menuitem"
                    >
                      Yêu cầu hỗ trợ
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-lg text-primary hover:bg-fourth hover:font-bold"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </nav>
    </header>
  );
}
