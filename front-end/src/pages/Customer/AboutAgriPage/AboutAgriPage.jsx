import { useState, useEffect } from 'react';
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import img1 from "../../../assets/aboutpage/san-xuat-nong-nghiep-huu-co-la-gi-2.jpg";
import img2 from "../../../assets/aboutpage/OIP.jpg";
import img3 from "../../../assets/aboutpage/OIP (1).jpg";
import Loading from "../../../components/Loading"; // Giả sử bạn có một component Loading

export default function AboutAgriPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <HeaderCustomer />
      <div className="container mx-auto py-8 mt-32 px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl font-bold my-4 text-center text-primary">
          Về AgriMart
        </h1>
        <p className="text-lg mb-6 text-justify leading-relaxed font-semibold text-primary">
          Chào mừng bạn đến với AgriMart, nền tảng hàng đầu về buôn bán các sản
          phẩm nông nghiệp. Sứ mệnh của chúng tôi là kết nối trực tiếp giữa nông
          dân và khách hàng, mang đến các sản phẩm tươi ngon và chất lượng cao,
          đồng thời thúc đẩy các thực hành nông nghiệp bền vững. Khi sử dụng
          AgriMart, bạn đang ủng hộ nông dân địa phương và giúp giảm lãng phí
          thực phẩm, đảm bảo sản phẩm đến tay người tiêu dùng khi tươi ngon
          nhất.
        </p>

        {/* Tầm nhìn và giá trị cốt lõi */}
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          I. Tầm nhìn và giá trị cốt lõi
        </h2>
        <p className="text-lg mb-6 text-justify leading-relaxed text-primary font-medium">
          Tại AgriMart, chúng tôi không chỉ đơn thuần là một nền tảng buôn bán
          sản phẩm nông nghiệp, mà còn mong muốn xây dựng một hệ sinh thái nông
          nghiệp bền vững và minh bạch. Giá trị cốt lõi của chúng tôi là sự kết
          nối, niềm tin và phát triển cộng đồng. Chúng tôi cam kết mang lại
          những sản phẩm an toàn và có trách nhiệm với môi trường.
        </p>

        {/* Tại sao chọn chúng tôi */}
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          II. Tại sao chọn chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
          <div className="bg-secondary shadow-lg p-6 rounded-lg transition-transform transform">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">
              Trực tiếp từ nông dân
            </h3>
            <img
              src={img1}
              alt="Trực tiếp từ nông dân"
              className="mb-4 w-11/12 mx-auto"
            />
            <p className="text-base text-justify text-primary font-medium">
              Bằng cách loại bỏ trung gian, chúng tôi đảm bảo giá cả hợp lý cho
              nông dân và sản phẩm tươi ngon cho khách hàng.
            </p>
          </div>
          <div className="bg-secondary shadow-lg p-6 rounded-lg transition-transform transform ">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">
              Tươi ngon & Bền vững
            </h3>
            <img
              src={img2}
              alt="Tươi ngon & Bền vững"
              className="mb-4 w-11/12 mx-auto"
            />
            <p className="text-base text-justify text-primary font-medium">
              Sản phẩm của chúng tôi được thu hoạch khi đạt độ chín hoàn hảo và
              giao đến tận tay bạn. Điều này giúp giảm thiểu lãng phí và tối ưu
              chất lượng.
            </p>
          </div>
          <div className="bg-secondary shadow-lg p-6 rounded-lg transition-transform transform ">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">
              Hỗ trợ cộng đồng
            </h3>
            <img
              src={img3}
              alt="Hỗ trợ cộng đồng"
              className="mb-4 w-11/12 mx-auto"
            />
            <p className="text-base text-justify text-primary font-medium">
              AgriMart xây dựng mối quan hệ bền chặt giữa nông dân và cộng đồng
              địa phương, giúp phát triển một hệ thống thực phẩm bền vững hơn.
            </p>
          </div>
        </div>

        {/* Quy trình làm việc */}
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          III. Quy trình làm việc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 my-10">
          <div className="bg-secondary shadow-lg p-6 rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary ">
              1. Trồng trọt
            </h3>
            <p className="text-base text-justify text-primary font-medium">
              Nông dân canh tác theo các phương pháp nông nghiệp bền vững và có
              trách nhiệm với môi trường.
            </p>
          </div>
          <div className="bg-secondary shadow-lg p-6 rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">
              2. Thu hoạch
            </h3>
            <p className="text-base text-justify text-primary font-medium">
              Sản phẩm được thu hoạch đúng thời điểm để đảm bảo độ tươi ngon và
              giá trị dinh dưỡng cao.
            </p>
          </div>
          <div className="bg-secondary shadow-lg p-6 rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">
              3. Đóng gói
            </h3>
            <p className="text-base text-justify text-primary font-medium">
              Quy trình đóng gói cẩn thận, sử dụng vật liệu thân thiện với môi
              trường và đảm bảo an toàn thực phẩm.
            </p>
          </div>
          <div className="bg-secondary shadow-lg p-6 rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">
              4. Giao hàng
            </h3>
            <p className="text-base text-justify text-primary font-medium">
              Giao hàng nhanh chóng và tiện lợi, giúp khách hàng nhận được sản
              phẩm tươi ngon ngay khi thu hoạch.
            </p>
          </div>
        </div>

        {/* Đánh giá từ khách hàng */}
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          IV. Khách hàng nói gì về AgriMart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <p className="text-base text-justify text-primary italic">
              “Tôi rất ấn tượng với chất lượng sản phẩm và dịch vụ của AgriMart.
              Rau củ luôn tươi ngon và được giao rất nhanh chóng.” -{" "}
              <span className="font-semibold">Hà Lưu</span>
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <p className="text-base text-justify text-primary italic">
              “AgriMart giúp tôi dễ dàng mua được sản phẩm nông nghiệp tươi mới
              từ các nông dân địa phương. Rất đáng tin cậy!” -{" "}
              <span className="font-semibold">Nguyễn Hùng</span>
            </p>
          </div>
        </div>
      </div>
      <FooterCustomer />
    </>
  );
}