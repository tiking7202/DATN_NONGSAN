import { useEffect, useState } from "react";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { formatDate } from "../../../utils/formatDate";
import ChangePasswordDialog from "../../../components/ChangePasswordDialog";
import ChangeInfoDialog from "../../../components/ChangeInfoDialog";

export default function FarmerDetailInfo() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      setUser(response.data);
    };

    fetchUser();
  }, [userId]);

  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const openChangePasswordDialog = () => {
    setIsOpenChangePassword(true);
  };

  const [isOpenChangeInfo, setIsOpenChangeInfo] = useState(false);
  const openChangeInfoDialog = () => {
    setIsOpenChangeInfo(true);
  };

  const refreshUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    setUser(response.data);
  };

  return (
    <div>
      <HeaderFarmer />
      <div className="flex">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20">
          <div className="bg-secondary w-11/12 m-auto mt-3 rounded-lg">
            <h1 className="font-bold text-primary text-2xl p-5">
              Thông tin cá nhân
            </h1>
          </div>
          <div className="bg-secondary w-11/12 m-auto mt-3 rounded-lg p-5">
            {user && (
              <div className="flex flex-wrap justify-between ">
                <div className="p-5 flex flex-col w-7/12">
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">
                    Họ và tên:{" "}
                  </p>
                  <p className="text-xl p-3 font-medium">{user.fullname}</p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">Email: </p>
                  <p className="text-xl p-3 font-medium">{user.email}</p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">
                    Username:{" "}
                  </p>
                  <p className="text-xl p-3 font-medium">{user.username}</p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">Mật khẩu</p>
                  <p
                    className="text-xl p-3 text-primary cursor-pointer italic font-medium"
                    onClick={() => openChangePasswordDialog()}
                  >
                    Thay đổi
                  </p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">
                    Số điện thoại:{" "}
                  </p>
                  <p className="text-xl p-3 font-medium">{user.phonenumber}</p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">
                    Địa chỉ:{" "}
                  </p>
                  <p className="text-xl p-3 font-medium">
                    {user.street +
                      ", " +
                      user.commune +
                      ", " +
                      user.district +
                      ", " +
                      user.province +
                      "."}
                  </p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">
                    Ngày sinh:
                  </p>
                  <p className="text-xl p-3 font-medium">
                    {formatDate(user.dob)}
                  </p>
                </div>
                <div className="flex">
                  <p className="font-bold text-xl p-3 text-primary">Số CCCD:</p>
                  <p className="text-xl p-3 font-medium">
                    {user.indentitycard}
                  </p>
                </div>
                <div className="flex justify-end w-2/3">
                  <button
                    className="bg-primary text-secondary font-bold text-xl p-2 rounded-md mt-5"
                    onClick={() => openChangeInfoDialog()}
                  >
                    Thay đổi thông tin
                  </button>
                </div>
              </div>
                <div className="p-5 w-4/12 border-l-2 border-primary">
                <div className="flex flex-col items-center">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="rounded-full w-1/3"
                  />
                  <button className="font-bold text-primary text-xl">
                    Thay đổi
                  </button>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpenChangePassword && (
        <ChangePasswordDialog
          onClose={() => setIsOpenChangePassword(false)}
          userId={userId}
        />
      )}
      {isOpenChangeInfo && (
        <ChangeInfoDialog
          onClose={() => setIsOpenChangeInfo(false)}
          user={user}
          refreshUser={refreshUser}
        />
      )}
    </div>
  );
}
