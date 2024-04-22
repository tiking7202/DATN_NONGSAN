import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCartPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { Link } from "react-router-dom";

export default function HeaderCustomer() {
  return (
    <header className="p-3 bg-primary text-white px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <nav className="flex flex-col w-4/5 m-auto sm:flex-row justify-between items-center">
        <section className="flex space-x-2 sm:space-x-4">
          <p className="cursor-pointer mx-1 sm:mx-2">Kênh nhà cung cấp</p>
          <p className="cursor-pointer mx-1 sm:mx-2">Trở thành nhà cung cấp</p>
        </section>
        <section className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-4">
          <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer mx-1 sm:mx-2">
            <FontAwesomeIcon icon={faBell} />
            <p>Thông báo</p>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <p className="cursor-pointer mx-1 sm:mx-2">Đăng nhập</p>
            <p className="cursor-pointer mx-1 sm:mx-2">Đăng ký</p>
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
          />
          <button className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-2 bg-green-500 text-white rounded-lg ">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button className="p-1 sm:p-2 text-white rounded text-2xl sm:text-4xl mt-2 sm:mt-0">
          <FontAwesomeIcon icon={faCartPlus} size="33" sm:size="66" />
        </button>
      </section>
    </header>
  );
}