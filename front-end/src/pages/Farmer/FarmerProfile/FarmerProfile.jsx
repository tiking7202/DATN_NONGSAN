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
  const openChangeInfoDialog = () => setIsOpenChangeInfo(true);

  const [isOpenChangeLogo, setIsOpenChangeLogo] = useState(false);
  const openChangeLogoDialog = () => setIsOpenChangeLogo(true);

  const [isOpenChangeImage, setIsOpenChangeImage] = useState(false);
  const openChangeImageDialog = () => setIsOpenChangeImage(true);

  const refreshFarm = async () => {
    const response = await axios.get(`${API_BASE_URL}/farm/user/${userId}`);
    setFarm(response.data[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderFarmer />
      <div className="flex">
        <FarmerNavBar />
        <div className="w-5/6 h-screen ml-auto bg-fourth mt-16 p-8 rounded-lg shadow-2xl">
          <h1 className="font-bold text-3xl text-primary mb-3 bg-white rounded-lg p-3 shadow-2xl">
            Thông tin trang trại
          </h1>

          {/* Thông tin chi tiết farm */}
          <div className="flex flex-wrap justify-between bg-white p-6 rounded-lg shadow-md">
            {farm && (
              <>
                {/* Thông tin cơ bản */}
                <div className="w-full lg:w-7/12 space-y-6">
                  {[
                    { label: "Tên trang trại", value: farm.farmname },
                    { label: "Diện tích", value: `${farm.farmarea} ha` },
                    { label: "Loại hình", value: farm.farmtype },
                    { label: "Số điện thoại", value: farm.farmphone },
                    { label: "Email", value: farm.farmemail },
                    { label: "Tổng sản phẩm", value: farm.farmproductstotal },
                    { label: "Mô tả", value: farm.farmdes, break: true },
                    { label: "Dịch vụ", value: farm.farmservice, break: true },
                    {
                      label: "Lời mời hợp tác",
                      value: farm.farminvite,
                      break: true,
                    },
                    {
                      label: "Địa chỉ",
                      value: `${farm.farmstreet}, ${farm.farmcommune}, ${farm.farmdistrict}, ${farm.farmprovince}`,
                    },
                  ].map((item, index) => (
                    <div className="flex" key={index}>
                      {item.break ? (
                        <>
                          <p className="font-bold text-lg text-primary w-4/12">
                            {item.label}:
                          </p>
                          <p className="text-lg font-medium text-justify">
                            {item.value}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-lg text-primary">
                            {item.label}:
                          </p>
                          <p className="ml-4 text-lg font-medium text-justify">
                            {item.value}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end mt-8">
                    <button
                      className="py-3 px-6 bg-primary text-white font-bold rounded-lg hover:opacity-80 transition-colors"
                      onClick={openChangeInfoDialog}
                    >
                      Thay đổi thông tin
                    </button>
                  </div>
                </div>

                {/* Hình ảnh */}
                <div className="w-full lg:w-4/12 space-y-6">
                  <div className="text-center">
                    {/* <p className="font-bold text-lg text-primary">
                      Logo Trang Trại
                    </p> */}
                    <img
                      src={farm.farmlogo}
                      alt="Farm Logo"
                      className="rounded-full w-40 h-40 object-cover mx-auto mt-4 shadow-lg"
                    />
                    <button
                      className="mt-4 py-2 px-4 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                      onClick={openChangeLogoDialog}
                    >
                      Thay đổi logo trang trại
                    </button>
                  </div>

                  <div className="text-center">
                    {/* <p className="font-bold text-lg text-primary">
                      Hình Ảnh Trang Trại
                    </p> */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {[
                        farm.farmimage,
                        farm.farmimage1,
                        farm.farmimage2,
                        farm.farmimage3,
                      ].map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Farm Image ${index}`}
                          className="rounded-lg w-full h-32 object-cover shadow-md"
                        />
                      ))}
                    </div>
                    <button
                      className="mt-4 py-2 px-4 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                      onClick={openChangeImageDialog}
                    >
                      Thay đổi hình ảnh trang trại
                    </button>
                  </div>
                </div>
              </>
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
