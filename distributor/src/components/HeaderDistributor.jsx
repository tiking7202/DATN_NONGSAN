import { Link } from "react-router-dom";

export default function HeaderDistributor() {
  return (
    <header className="py-4 bg-primary text-white px-3 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed top-0 w-full z-40">
      <nav className="flex flex-col w-11/12 m-auto sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl sm:text-4xl mx-2 sm:mx-5">
            <Link to="/">AgriMart</Link>
          </h1>
          <h1 className="text-xl font-medium ml-1 mb-2">Kênh nhà phân phối</h1>
        </div>
        <div className="flex items-center">
          <Link to='/' className="btn btn-primary font-medium hover:text-fourth m-2" >Trang chủ</Link>
          <Link to='/category' className="btn btn-primary font-medium hover:text-fourth m-2">Danh mục</Link>
          <Link to='/product'  className="btn btn-primary font-medium hover:text-fourth m-2">Sản phẩm</Link>
          <Link  to='/order' className="btn btn-primary font-medium hover:text-fourth m-2">Đơn hàng</Link>
          <Link to='/' className="btn btn-primary font-medium hover:text-fourth m-2">Đăng xuất</Link>
        </div>
      </nav>
    </header>
  );
}
