import { Link } from "react-router-dom";

export default function FarmerNavBar() {
  return (
    <div className="fixed top-0 left-0 w-1/6 bg-secondary mt-20">
      <nav className="flex flex-col text-xl">
        <Link to="/farmer" className="mt text-center text-secondary hover:opacity-85 p-2  bg-primary w-full border-2 border-slate-700 font-bold">
          Thống kê
        </Link>
        <Link to="/farmer/products" className="text-center text-black hover:bg-slate-100 p-2 w-full border-2 border-slate-700">
        Quản lý vườn
        </Link>
        <Link to="/farmer/orders" className="text-center text-black hover:bg-slate-100 p-2 w-full border-2 border-slate-700">
        Quản lý sản phẩm
        </Link>
        <Link to="/farmer/notifications" className="text-center text-black hover:bg-slate-100 p-2 w-full border-2 border-slate-700">
        Quản lý đơn hàng
        </Link>
        <Link to="/farmer/notifications" className="text-center text-black hover:bg-slate-100 p-2 w-full border-2 border-slate-700">
        Quản lý thanh toán
        </Link>
        <Link to="/farmer/notifications" className="text-center text-black hover:bg-slate-100 p-2 w-full border-2 border-slate-700">
        Thông tin cá nhân
        </Link>
      </nav>
    </div>
  );
}
