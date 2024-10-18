import { useEffect } from "react";
import HeaderDistributor from "../components/HeaderDistributor";
import { useToast } from "../context/ToastContext";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
  const { toastMessage } = useToast();

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, [toastMessage]);

  return (
    <div>
      <HeaderDistributor />
      <ToastContainer />
      <div className="w-10/12 m-auto flex justify-center mt-32">
        <div className="bg-primary text-center p-5 rounded-xl w-56 h-56 flex flex-col justify-center items-center transform transition-all duration-500 hover:bg-fourth hover:text-black shadow-lg hover:shadow-2xl m-10 text-white cursor-pointer">
          <p className="font-bold text-2xl">Số sản phẩm</p>
          <p className="font-extrabold italic text-7xl animate-bounce mt-6">
            100
          </p>
        </div>
        <div className="bg-red-700 text-center p-5 rounded-xl w-56 h-56 flex flex-col justify-center items-center transform transition-all duration-500 hover:bg-fourth hover:text-black shadow-lg hover:shadow-2xl m-10 text-white cursor-pointer ">
          <p className="font-bold text-2xl">Số nông trại</p>
          <p className="font-extrabold italic text-7xl animate-bounce mt-6">
            10
          </p>
        </div>
        <div className="bg-blue-600 text-center p-5 rounded-xl w-56 h-56 flex flex-col justify-center items-center transform transition-all duration-500 hover:bg-fourth hover:text-black shadow-lg hover:shadow-2xl m-10 text-white cursor-pointer ">
          <p className="font-bold text-2xl">Số khách hàng</p>
          <p className="font-extrabold italic text-7xl animate-bounce mt-6">
            50
          </p>
        </div>
        <div className="bg-fuchsia-800 text-center p-5 rounded-xl w-56 h-56 flex flex-col justify-center items-center transform transition-all duration-500 hover:bg-fourth hover:text-black shadow-lg hover:shadow-2xl m-10 text-white cursor-pointer ">
          <p className="font-bold text-2xl">Số đơn hàng</p>
          <p className="font-extrabold italic text-7xl animate-bounce mt-6">
            150
          </p>
        </div>
      </div>
        <div className="w-10/12 flex justify-center m-auto">
          <div className="w-5/12 bg-fourth h-96 m-7"></div>
          <div className="w-5/12 bg-fourth h-96 m-7"></div>

        </div>
    </div>
  );
}
