import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useToast } from "../../../../context/ToastContext";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

export default function HeaderFarmer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("accessToken");
  let fullName = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    fullName = decodedToken?.fullname;
  }

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
      toast.error(error,{
        position: "top-right",
        time: 500,
      });
    }
  };

  return (
    <header className="p-3 bg-primary text-white px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed top-0 w-full z-40">
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
          <div className="flex items-center cursor-pointer mx-2">
            <FontAwesomeIcon icon={faBell} />
            {/* <p>Thông báo</p> */}
          </div>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
            <p className="cursor-pointer"  onClick={() => setIsOpen(!isOpen)}>{fullName}</p>

            {isOpen && (
                  <div className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
