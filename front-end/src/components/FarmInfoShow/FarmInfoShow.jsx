import HeaderCustomer from "../HeaderCustomer/HeaderCustomer";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FarmInfoShow() {
  // const [farm, setFarm] = useState(null);
  // const farmId = "";

  // useEffect(() => {
  //   axios
  //     .get(`http://your-api-url/farm/${farmId}`)
  //     .then((response) => {
  //       setFarm(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, [farmId]);

  return (
    <div>
      <HeaderCustomer />

      <div className="bg-fourth mt-32">
        <div className="w-4/5 mx-auto bg-white px-3 pt-8 pb-5 rounded-md">
          <p className="font-bold text-2xl text-primary">
            Tên trang trại: <span className="ml-3 text-third">Green Farm</span>
          </p>
        </div>

        <div className="w-4/5 bg-white rounded-md m-auto mt-3 flex items-stretch">
          <div className="w-3/12 object-fit">
            <img
              src="https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png"
              alt="farm"
              className="object-cover h-full"
            />
          </div>
          <div className="w-9/12 object-fit">
            <img
              src="https://img.vn/uploads/thuvien/singa-png-20220719150401Tdj1WAJFQr.png"
              alt="farm"
              className="object-cover h-full"
            />
          </div>
        </div>
        {/* Navigation */}
        <div className="w-4/5 bg-white rounded-md m-auto mt-3 flex p-5">
          <Link to="/" className="text-2xl font-bold text-primary mx-5">
            Giới thiệu
          </Link>
          <Link to="/" className="text-2xl font-bold text-primary mx-5">
            Sản phẩm
          </Link>
          <Link to="/" className="text-2xl font-bold text-primary mx-5">
            Thông tin mùa vụ
          </Link>
        </div>
      </div>
    </div>
  );
}
