import { useEffect } from "react";
import HeaderDistributor from "../components/HeaderDistributor";
import { useToast } from "../context/ToastContext";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
  const { toastMessage } = useToast();

  useEffect (() => {
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, [toastMessage]);

  return (
    <>
      <HeaderDistributor />
      <ToastContainer />
    </>
  )
}
