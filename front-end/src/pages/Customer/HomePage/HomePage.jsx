import { useEffect } from "react";
import { useToast } from "../../../../context/ToastContext";
import CategoryShow from "../../../components/CustomerComponent/CategoryShow/CategoryShow";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";

import ProductShowHome from "../../../components/CustomerComponent/ProductShowHome/ProductShowHome";
import SlideShow from "../../../components/CustomerComponent/SlideShow/SlideShow";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const { toastMessage, setToastMessage } = useToast();
  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      setToastMessage(null);
    }
  }, [toastMessage, setToastMessage]);

  return (
    <div className="h-screen flex flex-col bg-fourth">
      <HeaderCustomer />
      {/* <ToastContainer /> */}
      <div className="flex justify-center my-10 mt-44">
        {" "}
        {/* Add flex here */}
        <SlideShow className="w-3/5" />
        <div
          className="w-1/5 flex flex-col items-center justify-center h-full"
          onClick={() => navigate("/about-agri")}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/storgeimage.appspot.com/o/SliderImage%2Fslider4.jpg?alt=media&token=135edbe7-ab5b-4145-af9e-2565f768120c"
            alt="Slider Image"
            className="w-3/4 h-1/2 object-cover rounded-t-lg"
          />
          <div className="bg-primary cursor-pointer w-3/4 h-1/2 rounded-b-lg">
            <p className="mt-9 text-secondary text-3xl text-center">
              Tìm hiểu thêm về
            </p>
            <p className="text-4xl ml-5 font-bold text-center text-secondary">
              Agrimart
            </p>
          </div>
        </div>
      </div>
      <div className="w-3/5 m-auto bg-secondary px-9 py-3 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">Danh mục sản phẩm</h1>
        <CategoryShow />
      </div>
      <div className="w-full bg-fourth py-3">
        <div className="m-auto w-4/5 px-9 rounded-lg">
          <div className="m-auto w-full bg-secondary rounded-lg my-3 p-5 ">
            <h1 className="text-4xl font-bold text-primary">Dành cho bạn</h1>
          </div>
          <ProductShowHome />
          
        </div>
      </div>
      <FooterCustomer />
    </div>
  );
}

export default HomePage;
