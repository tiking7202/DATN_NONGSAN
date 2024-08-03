import CategoryShow from "../../../components/CustomerComponent/CategoryShow/CategoryShow";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";

import ProductShowHome from "../../../components/CustomerComponent/ProductShowHome/ProductShowHome";
import SlideShow from "../../../components/CustomerComponent/SlideShow/SlideShow";

function HomePage() {
  return (
    <div className="h-screen flex flex-col bg-fourth">
      <HeaderCustomer />
      {/* <ToastContainer /> */}
      <div className="flex justify-center my-10 mt-44">
        {" "}
        {/* Add flex here */}
        <SlideShow className="w-3/5" />
        <div className="w-1/5 flex flex-col items-center justify-center h-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/storgeimage.appspot.com/o/SliderImage%2Fslider4.jpg?alt=media&token=135edbe7-ab5b-4145-af9e-2565f768120c"
            alt="Slider Image"
            className="w-3/4 h-1/2 object-cover rounded-t-lg"
          />
          <div className="bg-primary cursor-pointer w-3/4 h-1/2 rounded-b-lg">
            <p className="mt-9 text-secondary text-3xl text-center ">
              Tìm hiểu thêm về
            </p>
            <p className="text-4xl ml-5 font-bold text-center text-secondary">
              {" "}
              Agrimart
            </p>
          </div>
        </div>
      </div>
      <div className="w-3/5 m-auto bg-secondary px-9 py-4 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">Danh mục sản phẩm</h1>
        <CategoryShow />
      </div>
      <div className="w-full m-auto bg-fourth">
        <ProductShowHome />
      </div>
      <FooterCustomer />
    </div>
  );
}

export default HomePage;
