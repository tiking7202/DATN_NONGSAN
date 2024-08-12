import { toast } from "react-toastify";
import { useToast } from "../../../../context/ToastContext";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import { useEffect } from "react";

export default function FarmerDashboard() {
  const { toastMessage, setToastMessage } = useToast();
  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      setToastMessage(null);
    }
  }, [toastMessage, setToastMessage]);

  return (
    <div>
      <HeaderFarmer />
      <div className="flex mt-20">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20">
          <h1>
            Dashboard
          </h1>
          </div>
      </div>
    </div>
  )
}
