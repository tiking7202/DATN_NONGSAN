import FarmInfoShow from "../../../components/FarmInfoShow/FarmInfoShow";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDetail() {
  let { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/product/${id}`)
      .then((response) => {
        console.log(response.data); 
        setProduct(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);
  
  const [currentImage, setCurrentImage] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const changeImage = (newImage) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImage(newImage);
      setIsChanging(false);
    }, 100);
  };

  return (
    <>
      <FarmInfoShow />

      <div className="bg-fourth py-5">
        <div className="w-4/5 mx-auto bg-white rounded-md flex p-5">
          {product && (
            <>
              <div className="m-5 w-1/2">
                <img
                  src={currentImage || product.productimage1}
                  alt="product"
                  className={`object-cover rounded-md w-5/6 m-auto h-80 transition duration-100 ease-in-out ${
                    isChanging ? "opacity-0" : ""
                  }`}
                />
                <div className="flex justify-center mt-2">
                  <img
                    src={product.productimage1}
                    alt="product"
                    className="object-cover rounded-md mx-3 w-16 h-10 cursor-pointer"
                    onClick={() => changeImage(product.productimage1)}
                  />
                  <img
                    src={product.productimage2}
                    alt="product"
                    className="object-cover rounded-md mx-3 w-16 h-10 cursor-pointer"
                    onClick={() => changeImage(product.productimage2)}
                  />
                  <img
                    src={product.productimage3}
                    alt="product"
                    className="object-cover rounded-md mx-3 w-16 h-10 cursor-pointer"
                    onClick={() => changeImage(product.productimage3)}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <h1 className="text-3xl text-primary font-bold">
                  {product.productname}
                </h1>
                <p>Danh mục: Rau, củ, quả</p>
                <div className="">
                  <span className="text-2xl text-primary font-bold">
                    {product.productprice} VNĐ
                  </span>
                  <span className="text-md ml-2">/kg</span>
                </div>
                <div className="my-4 w-full h-1 bg-primary"></div>
                <div className="">
                  <p className="">
                    Giao hàng từ: <span>Đà Lạt</span>
                  </p>
                  <p className="">
                    Số lượng: <span>{product.productquantity} kg</span>
                  </p>
                  <p className="">
                    Trạng thái:{" "}
                    <span>
                      {product.productquantity > 0 ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </p>
                  <div className="">
                    <button className="bg-primary text-white p-3 rounded-md mt-4">
                      Thêm vào giỏ hàng
                      <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
                    </button>
                    <button className="bg-primary text-white p-3 rounded-md mt-4 ml-2">
                      Mua ngay{" "}
                      <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="ml-2"
                      />
                    </button>
                  </div>
                  <p>
                    Ngày hết hạn:{" "}
                    <span>
                      {new Date(product.expirydate).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                  <p>
                    Bình luận:{" "}
                    <span>
                      {new Date(product.expirydate).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                  <p>
                    Đánh giá:{" "}
                    <span>
                      {new Date(product.expirydate).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-5">
          <h1 className="font-bold text-primary text-2xl">
            Thông tin chi tiết về sản phẩm
          </h1>
        </div>
        <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-5">
          <p className="text-justify text-base m-3">{product.overviewdes}</p>

          {product.healtbenefit && (
            <>
              <p className="text-justify text-xl font-bold m-3">
                Lợi ích đối với sức khỏe
              </p>
              <p className="text-justify text-base m-3">
                {product.healtbenefit}
              </p>
            </>
          )}

          {product.storagemethod && (
            <>
              <p className="text-justify text-xl font-bold m-3">
                Phương pháp bảo quản sản phẩm
              </p>
              <p className="text-justify text-base m-3">
                {product.storagemethod}
              </p>
            </>
          )}
          {product.cookingmethod && (
            <>
              <p className="text-justify text-xl font-bold m-3">
                Phương pháp chế biến sản phẩm
              </p>
              <p className="text-justify text-base m-3">
                {product.cookingmethod}
              </p>
            </>
          )}
        </div>

        <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-5">
          <h1 className="font-bold text-primary text-2xl">
            Bình luận, đánh giá
          </h1>
        </div>

        <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-5">
          <h1 className="font-bold text-primary text-2xl">
            Sản phẩm liên quan
          </h1>
        </div>
      </div>
    </>
  );
}