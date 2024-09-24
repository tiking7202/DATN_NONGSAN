import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMoneyBillWave,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../../service/CustomerService/cartService.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer.jsx";
import { API_BASE_URL } from "../../../config/config.js";
import FarmInfoShow from "../../../components/CustomerComponent/FarmInfoShow/FarmInfoShow.jsx";
import CommentShow from "../../../components/CustomerComponent/CommentShow/CommentShow.jsx";
import { getAmountOfReview } from "../../../service/CustomerService/reviewService.js";

export default function ProductDetail() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewCount, setReviewCount] = useState(0);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      toast.error("Số lượng sản phẩm thêm vào giỏ hàng phải lớn hơn 0", {
        position: "top-right",
        time: 500,
      });
      return;
    }
    setQuantity(quantity - 1);
  };
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));

    const fetchReviewCount = async () => {
      try {
        const reviewResponse = await getAmountOfReview(id);
        setReviewCount(reviewResponse.data);
      } catch (error) {
        console.error("Error fetching review count:", error);
      }
    };

    fetchReviewCount();
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

  const handleAddToCart = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!", {
        position: "top-right",
        time: 500,
      });
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userid;
      addToCart(product.productid, userId, quantity)
        .then((response) => {
          response;
          toast.success("Thêm vào giỏ hàng thành công!", {
            position: "top-right",
            time: 500,
          });
          setQuantity(1);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-right",
            time: 500,
          });
        });
    }
  };

  return (
    <>
      <FarmInfoShow />
      {product && (
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
                  <h1 className="text-4xl text-primary font-bold mx-3">
                    {product.productname}
                  </h1>
                  <p className="mx-5 font-thin ">
                    Danh mục: {product.categoryname}
                  </p>
                  <div className="flex">
                    <span className="text-4xl m-3 text-primary font-semibold text">
                      {product.productprice} VNĐ
                    </span>
                    <span className="text-2xl my-auto ">
                      /{product.unitofmeasure}
                    </span>
                  </div>
                  <div className="my-4 w-full mx-auto h-1 bg-primary"></div>
                  <div className="p-2">
                    <div className="m-2">
                      <span className="text-primary font-medium mr-1">
                        Giao hàng từ:{" "}
                      </span>
                      <span className="font-semibold">
                        {product.farmprovince}
                      </span>
                    </div>
                    <div className="m-2">
                      <span className="text-primary font-medium mr-1">
                        Số lượng:{" "}
                      </span>
                      <span className="font-semibold">
                        {product.productquantity} ({product.unitofmeasure})
                      </span>
                    </div>
                    <div className="m-2">
                      <span className="text-primary font-medium mr-1">
                        Trạng thái:{" "}
                      </span>
                      <span className="font-semibold">
                        {product.productquantity > 0 ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </div>
                    <div className="flex m-2">
                      <span className="text-primary font-medium mr-1 my-auto">
                        Số lượng:{" "}
                      </span>

                      <div className="w-1/4 p-1 flex items-center bg-fourth space-x-2 ml-3 border-2 border-neutral-950 rounded-md font-bold ">
                        <button
                          onClick={handleDecrease}
                          className="w-1/3 px-2 py-1 rounded-md text-gray-900 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="w-1/3 px-2 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={handleIncrease}
                          className="w-1/3 px-2 py-1 rounded-md text-gray-900 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex m-2 w-3/4">
                      <button
                        className="bg-primary text-white p-3 rounded-md mt-4 w-1/2 hover:opacity-90"
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ hàng
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="ml-2"
                        />
                      </button>
                      <button
                        className="bg-primary text-white p-3 rounded-md mt-4 ml-3 w-1/2  hover:opacity-90"
                        onClick={() => navigate("/cart")}
                      >
                        Mua ngay{" "}
                        <FontAwesomeIcon
                          icon={faMoneyBillWave}
                          className="ml-2"
                        />
                      </button>
                    </div>
                    <div className="flex m-2">
                      <span className="text-primary font-medium mr-1">
                        Ngày hết hạn:{" "}
                      </span>
                      <span className="font-semibold ml-2">
                        {new Date(product.expirydate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <div className="flex m-2">
                      <span className="text-primary font-medium mr-1">
                        Bình luận:{" "}
                      </span>
                      <span className="font-semibold ml-2">
                        {reviewCount[5]} bình luận
                      </span>
                    </div>
                    <div className="flex m-2">
                      <span className="text-primary font-medium mr-1">
                        Đánh giá:{" "}
                      </span>
                      <span className="font-semibold ml-2">
                        {reviewCount[6]}
                        <FontAwesomeIcon
                          icon={faStar}
                          color="#ffd700"
                          className="ml-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-7">
            <h1 className="font-bold text-primary text-2xl">
              Thông tin chi tiết về sản phẩm
            </h1>
          </div>
          <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-2">
            <p className="text-justify text-base m-3 font-medium ml-5">
              {product.overviewdes}
            </p>

            {product.healtbenefit && (
              <>
                <p className="text-justify text-xl font-bold m-3">
                  Lợi ích đối với sức khỏe
                </p>
                <p className="text-justify text-base m-3 font-medium ml-5">
                  {product.healtbenefit}
                </p>
              </>
            )}

            {product.storagemethod && (
              <>
                <p className="text-justify text-xl font-bold m-3">
                  Phương pháp bảo quản sản phẩm
                </p>
                <p className="text-justify text-base m-3 font-medium ml-5">
                  {product.storagemethod}
                </p>
              </>
            )}
            {product.cookingmethod && (
              <>
                <p className="text-justify text-xl font-bold m-3">
                  Phương pháp chế biến sản phẩm
                </p>
                <p className="text-justify text-base m-3 font-medium ml-5">
                  {product.cookingmethod}
                </p>
              </>
            )}
          </div>

          <div className="w-4/5 mx-auto bg-secondary rounded-md p-5 mt-7">
            <h1 className="font-bold text-primary text-2xl">
              Bình luận, đánh giá về sản phẩm
            </h1>
          </div>
          <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-2">
            <CommentShow />
          </div>
          <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-7">
            <h1 className="font-bold text-primary text-2xl">
              Sản phẩm liên quan
            </h1>
          </div>
        </div>
      )}
      <FooterCustomer />
    </>
  );
}
