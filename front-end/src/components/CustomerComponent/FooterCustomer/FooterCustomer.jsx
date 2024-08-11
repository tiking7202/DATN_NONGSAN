export default function FooterCustomer() {
  return (
    <footer className="bg-primary text-secondary p-4 w-full">
      <div className="flex w-1/2 m-auto text-lg">
        <div className="w-1/3">
          <h3 className="font-medium ">THÔNG TIN LIÊN LẠC</h3>
          <p>Email: agricuturehungha@gmail.com</p>
          <p>Hotline: 0123456789</p>
        </div>
        <div className="w-1/3">
          <h3 className="font-medium ">DỊCH VỤ KHÁCH HÀNG</h3>
          <p>Hướng Dẫn Mua Hàng</p>
          <p>Giao & Nhận Hàng</p>
          <p>Chính Sách Bán Hàng</p>
          <p>Trở Thành Nhà Cung Cấp?</p>
        </div>
        <div className="w-1/6">
          <h3 className="font-medium ">CÔNG TY</h3>
          <p>Giới thiệu</p>
          <p>Khách hàng</p>
          <p>Đối tác</p>
          <p>Liên hệ</p>
        </div>
        <div className="w-1/6">
          <h3 className="font-medium ">KẾT NỐI</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Youtube</p>
        </div>
      </div>
        <div className="text-center text-lg mt-5">
          <p>Person in charge of information management: Lưu Vũ Hà & Nguyễn Phước Đắc Hùng</p>
          <p className="font-medium">© 2024 AgriMart. All rights reserved.</p>
        </div>
    </footer>
  );
}