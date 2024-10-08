import { Link, useLocation } from "react-router-dom";

const FarmerNavBar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 w-1/6 bg-secondary mt-20 shadow-xl">
      <nav className="flex flex-col text-xl font-bold">
        <Link
          to="/farmer"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === "/farmer"
              ? "bg-primary font-bold text-secondary hover:opacity-85"
              : ""
          }`}
        >
          Thống kê
        </Link>
        <Link
          to="/farmer/farms/crop"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === "/farmer/farms/crop"
              ? "bg-primary font-bold text-secondary hover:opacity-85"
              : ""
          }`}
        >
          Quản lý vụ mùa
        </Link>
        <Link
          to="/farmer/products"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === "/farmer/products"
              ? "bg-primary font-bold text-secondary hover:opacity-85"
              : ""
          }`}
        >
          Quản lý sản phẩm
        </Link>
        <Link
          to="/farmer/orders"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === "/farmer/orders"
              ? "bg-primary font-bold text-secondary hover:opacity-85"
              : ""
          }`}
        >
          Quản lý đơn hàng
        </Link>
        <Link
          to="/farmer/farm/info"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === "/farmer/farm/info"
              ? "bg-primary font-bold text-secondary hover:opacity-85"
              : ""
          }`}
        >
          Quản lý trang trại
        </Link>
        <Link
          to="/farmer/profile"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === "/farmer/profile"
              ? "bg-primary font-bold text-secondary hover:opacity-85"
              : ""
          }`}
        >
          Thông tin cá nhân
        </Link>
      </nav>
    </div>
  );
};

export default FarmerNavBar;
