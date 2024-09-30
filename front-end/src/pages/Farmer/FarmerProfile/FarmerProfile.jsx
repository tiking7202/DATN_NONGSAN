import { useEffect, useState } from "react";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { jwtDecode } from "jwt-decode";
import ChangeInfoFarmDialog from "../../../components/DialogFarm/ChangeInfoFarmDialog";
import ChangeLogoDialog from "../../../components/DialogFarm/ChangeLogoDialog";
import ChangeImageFarmDialog from "../../../components/DialogFarm/ChangeImageFarmDialog";
export default function FarmDetailInfo() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;
  const [farm, setFarm] = useState({});

  useEffect(() => {
    const fetchFarm = async () => {
      const response = await axios.get(`${API_BASE_URL}/farm/user/${userId}`);
      setFarm(response.data[0]);
    };

    fetchFarm();
  }, [userId]);

  const [isOpenChangeInfo, setIsOpenChangeInfo] = useState(false);
  const openChangeInfoDialog = () => {
    setIsOpenChangeInfo(true);
  };

  const [isOpenChangeLogo, setIsOpenChangeLogo] = useState(false);
  const openChangeLogoDialog = () => {
    setIsOpenChangeLogo(true);
  };

  const [isOpenChangeImage, setIsOpenChangeImage] = useState(false);
  const openChangeImageDialog = () => {
    setIsOpenChangeImage(true);
  };

  const refreshFarm = async () => {
    const response = await axios.get(`${API_BASE_URL}/farm/user/${userId}`);
    setFarm(response.data[0]);
  };

  return (
    <div>
      <HeaderFarmer />
      <div className="flex">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20 overflow-y-auto">
          <div className="bg-secondary w-11/12 m-auto mt-3 rounded-lg">
            <h1 className="font-bold text-primary text-2xl p-5">
              Thông tin trang trại
            </h1>
          </div>

          {/* Thông tin chi tiết farm */}
          <div className="bg-secondary w-11/12 m-auto mt-3 rounded-lg p-5">
            {farm && (
              <div className="flex flex-wrap justify-between">
                {/* Thông tin cơ bản */}
                <div className="p-5 pb-20 flex flex-col w-7/12">
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Tên trang trại:
                    </p>
                    <p className="text-xl p-3 font-medium">{farm.farmname}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Diện tích:
                    </p>
                    <p className="text-xl p-3 font-medium">
                      {farm.farmarea} ha
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Loại hình:
                    </p>
                    <p className="text-xl p-3 font-medium">{farm.farmtype}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Số điện thoại:
                    </p>
                    <p className="text-xl p-3 font-medium">{farm.farmphone}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">Email:</p>
                    <p className="text-xl p-3 font-medium">{farm.farmemail}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Tổng sản phẩm:
                    </p>
                    <p className="text-xl p-3 font-medium">
                      {farm.farmproductstotal}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Dịch vụ:
                    </p>
                    <p className="text-xl p-3 font-medium">
                      {farm.farmservice}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Lời mời hợp tác:
                    </p>
                    <p className="text-xl p-3 font-medium">{farm.farminvite}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">Mô tả:</p>
                    <p className="text-xl p-3 font-medium">{farm.farmdes}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-xl p-3 text-primary">
                      Địa chỉ:
                    </p>
                    <p className="text-xl p-3 font-medium">
                      {farm.farmstreet}, {farm.farmcommune}, {farm.farmdistrict}
                      , {farm.farmprovince}.
                    </p>
                  </div>
                  <div className="flex justify-center mt-5">
                    <button
                      className="p-3 bg-primary text-white font-bold rounded-md w-full max-w-xs"
                      onClick={() => openChangeInfoDialog()}
                    >
                      Thay đổi thông tin
                    </button>
                  </div>
                </div>

                {/* Hình ảnh */}
                <div className="p-5 w-4/12 border-l-2 border-primary">
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-xl text-primary">
                      Logo Trang Trại
                    </p>
                    <img
                      src={farm.farmlogo}
                      alt="Farm Logo"
                      className="rounded-full w-2/3 mb-5"
                    />
                    {/* Button Thay đổi logo trang trại */}
                    <button
                      className="mb-5 p-3 bg-primary text-white font-bold rounded-md w-full max-w-xs"
                      onClick={() => openChangeLogoDialog()}
                    >
                      Thay đổi logo trang trại
                    </button>
                    <p className="font-bold text-xl text-primary mt-10">
                      Hình Ảnh Trang Trại
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <img
                        src={farm.farmimage}
                        alt="Farm Image"
                        className="rounded-lg w-full"
                      />
                      <img
                        src={farm.farmimage1}
                        alt="Farm Image 1"
                        className="rounded-lg w-full"
                      />
                      <img
                        src={farm.farmimage2}
                        alt="Farm Image 2"
                        className="rounded-lg w-full"
                      />
                      <img
                        src={farm.farmimage3}
                        alt="Farm Image 3"
                        className="rounded-lg w-full"
                      />
                    </div>
                    {/* Button Thay đổi hình ảnh trang trại */}
                    <button
                      className="mt-5 p-3 bg-primary text-white font-bold rounded-md w-full max-w-xs"
                      onClick={() => openChangeImageDialog()}
                    >
                      Thay đổi hình ảnh trang trại
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpenChangeInfo && (
        <ChangeInfoFarmDialog
          onClose={() => setIsOpenChangeInfo(false)}
          farm={farm}
          refreshFarm={refreshFarm}
        />
      )}
      {isOpenChangeLogo && (
        <ChangeLogoDialog
          onClose={() => setIsOpenChangeLogo(false)}
          farm={farm}
          refreshFarm={refreshFarm}
        />
      )}
      {isOpenChangeImage && (
        <ChangeImageFarmDialog
          onClose={() => setIsOpenChangeImage(false)}
          farm={farm}
          refreshFarm={refreshFarm}
        />
      )}
    </div>
  );
}
