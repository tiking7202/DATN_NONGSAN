import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCartPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../../../App.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../../config/config";
import { useToast } from "../../../../context/ToastContext";
import { isCustomer } from "../../../utils/roleCheck";


export default function HeaderCustomer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("accessToken");
  let fullName = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    fullName = decodedToken?.fullname;
  }

  useEffect(() => {
    //Kiểm tra có phải là customer hay không
    if(token) {
      if(!isCustomer(token)) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }
  }, [token, navigate]);

  const { setToastMessage } = useToast();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/logout`);
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToastMessage("Đăng xuất thành công!");
        
        navigate("/login");
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

  const handleCartClick = () => {
    token ? navigate("/cart") : navigate("/login");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { search: query.trim() },
      });
      const data = response.data;
      navigate(`/search?query=${encodeURIComponent(query.trim())}`, { state: { productSearch: data } });
      setQuery("");
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleRouteToLoginFarmer =  async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/logout`);
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/farmer/login");
      } else {
        toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
      }    
  }

  return (
    <header className="p-3 bg-primary text-white px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed top-0 w-full z-40">
      <ToastContainer />
      <nav className="flex flex-col w-4/5 m-auto sm:flex-row justify-between items-center">
        <section className="flex space-x-2 sm:space-x-4">
          <p className="cursor-pointer mx-1 sm:mx-2" onClick={handleRouteToLoginFarmer}>Kênh nhà cung cấp</p>
          <p className="cursor-pointer mx-1 sm:mx-2">Trở thành nhà cung cấp</p>
        </section>
        <section className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-4">
          <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer mx-1 sm:mx-2">
            <FontAwesomeIcon icon={faBell} />
            <p>Thông báo</p>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            {fullName ? (
              <div className="relative inline-block text-left">
                <div>
                  <p
                    className="cursor-pointer mx-1 sm:mx-2"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {fullName}
                  </p>
                </div>

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
                        href="/change-info"
                        className="block px-4 py-2 text-sm text-primary hover:bg-fourth hover:font-bold"
                        role="menuitem"
                      >
                        Thay đổi thông tin
                      </a>
                      
                      <a
                        href="/change-password"
                        className="block px-4 py-2 text-sm text-primary hover:bg-fourth hover:font-bold"
                        role="menuitem"
                      >
                        Thay đổi mật khẩu
                      </a>
                      <a
                        href="/purchase-history"
                        className="block px-4 py-2 text-sm text-primary hover:bg-fourth hover:font-bold"
                        role="menuitem"
                      >
                        Lịch sử mua hàng
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-primary hover:bg-fourth hover:font-bold"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <p className="cursor-pointer mx-1 sm:mx-2">Đăng nhập</p>
                </Link>
                <Link to="/register/step1">
                  <p className="cursor-pointer mx-1 sm:mx-2">Đăng ký</p>
                </Link>
              </>
            )}
          </div>
        </section>
      </nav>
      <section className="w-4/5 m-auto flex flex-col sm:flex-row justify-between items-center space-x-2 sm:space-x-4 mt-2 sm:mt-4">
        <h1 className="font-bold text-2xl sm:text-4xl mx-2 sm:mx-5">
          <Link to="/">AgriMart</Link>
        </h1>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, thương hiệu và cửa hàng"
            className="w-full p-2 sm:p-3 border rounded-sm placeholder-color pr-5 sm:pr-10 text-primary"
            style={{ zIndex: 500 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-2 bg-green-500 text-white rounded-lg "
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button
          className="p-1 sm:p-2 text-white rounded text-2xl sm:text-4xl mt-2 sm:mt-0"
          onClick={handleCartClick}
        >
          <FontAwesomeIcon icon={faCartPlus} size="1x" />
        </button>
      </section>
    </header>
  );
}
