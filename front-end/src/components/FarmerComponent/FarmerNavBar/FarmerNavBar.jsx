import { Link, useLocation } from 'react-router-dom';

const FarmerNavBar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 w-1/6 bg-secondary mt-20">
      <nav className="flex flex-col text-xl">
        <Link
          to="/farmer"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === '/farmer' ? 'bg-primary font-bold text-secondary hover:opacity-85' : ''
          }`}
        >
          Thống kê
        </Link>
        <Link
          to="/farmer/farms"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === '/farmer/farms' ? 'bg-primary font-bold text-secondary hover:opacity-85' : ''
          }`}
        >
          Quản lý vườn
        </Link>
        <Link
          to="/farmer/products"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === '/farmer/products' ? 'bg-primary font-bold text-secondary hover:opacity-85' : ''
          }`}
        >
          Quản lý sản phẩm
        </Link>
        <Link
          to="/farmer/orders"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === '/farmer/orders' ? 'bg-primary font-bold text-secondary hover:opacity-85' : ''
          }`}
        >
          Quản lý đơn hàng
        </Link>
        <Link
          to="/farmer/payments"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === '/farmer/payments' ? 'bg-primary font-bold text-secondary hover:opacity-85' : ''
          }`}
        >
          Quản lý thanh toán
        </Link>
        <Link
          to="/farmer/profile"
          className={`text-center text-black p-2 w-full border-2 border-slate-700 ${
            location.pathname === '/farmer/profile' ? 'bg-primary font-bold text-secondary hover:opacity-85' : ''
          }`}
        >
          Thông tin cá nhân
        </Link>
      </nav>
    </div>
  );
};

export default FarmerNavBar;