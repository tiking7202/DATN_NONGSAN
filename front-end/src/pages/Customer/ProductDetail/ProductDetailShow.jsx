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
import Loading from "../../../components/Loading.jsx";

export default function ProductDetail() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [batchId, setBatchId] = useState("");
  const [batchList, setBatchList] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      toast.error("Số lượng sản phẩm thêm vào giỏ hàng phải lớn hơn 0");
      return;
    }
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before API calls
      try {
        const productResponse = await axios.get(
          `${API_BASE_URL}/product/${id}`
        );
        setProduct(productResponse.data);

        const reviewResponse = await getAmountOfReview(id);
        setReviewCount(reviewResponse.data);

        const batchResponse = await axios.get(
          `${API_BASE_URL}/product-batch/customer/${id}`
        );
        setBatchList(batchResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userid;
      if (!batchId) {
        toast.error("Vui lòng chọn lô hàng bạn muốn mua!");
        return;
      }
      setIsAddingToCart(true); // Set loading to true before API call
      try {
        await addToCart(product.productid, userId, quantity, batchId);
        toast.success("Thêm vào giỏ hàng thành công!");
        setQuantity(1);
        setBatchId("");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsAddingToCart(false); // Set loading to false after API call
      }
    }
  };

  return (
    <>
      <FarmInfoShow />
      {loading ? (
        <Loading />
      ) : (
        product && (
          <div className="bg-fourth py-5">
            <div className="w-4/5 mx-auto bg-white rounded-md flex p-5 shadow-xl">
              {product && (
                <>
                  <div className="m-5 w-1/2">
                    <img
                      src={currentImage || product.productimage1}
                      alt="product"
                      className={`object-cover rounded-md w-full m-auto h-96 transition duration-300 ease-in-out transform shadow-2xl ${
                        isChanging ? "opacity-0 scale-90" : "scale-100"
                      }`}
                    />
                    <div className="flex justify-center mt-10">
                      <img
                        src={product.productimage1}
                        alt="product"
                        className="object-cover rounded-md mx-5 w-32 h-20 cursor-pointer transition transform duration-200 shadow-2xl hover:scale-110 hover:shadow-lg"
                        onClick={() => changeImage(product.productimage1)}
                      />
                      <img
                        src={product.productimage2}
                        alt="product"
                        className="object-cover rounded-md mx-5 w-32 h-20 cursor-pointer transition transform duration-200 shadow-2xl hover:scale-110 hover:shadow-lg"
                        onClick={() => changeImage(product.productimage2)}
                      />
                      <img
                        src={product.productimage3}
                        alt="product"
                        className="object-cover rounded-md mx-5 w-32 h-20 cursor-pointer transition transform duration-200 shadow-2xl hover:scale-110 hover:shadow-lg"
                        onClick={() => changeImage(product.productimage3)}
                      />
                    </div>
                  </div>

                  <div className="w-1/2">
                    <h1 className="text-4xl text-primary font-bold mx-5 mt-5">
                      {product.productname}
                    </h1>
                    <p className="mx-7 mt-3 font-thin ">
                      Danh mục: {product.categoryname}
                    </p>
                    <div className="my-2 w-full mx-auto h-1 bg-primary"></div>
                    <div className="p-1">
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
                          Trạng thái:{" "}
                        </span>
                        <span className="font-semibold">
                          {batchList.length > 0 ? "Còn hàng" : "Hết hàng"}
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
                      <div className="my-2 w-full mx-auto h-1 bg-primary"></div>
                      <div className="flex m-2 mt-3">
                        <span className="text-primary font-medium mr-1 my-auto">
                          Số lượng:{" "}
                        </span>

                        <div className="w-5/12 p-1 flex items-center bg-white space-x-2 ml-3 rounded-md font-bold border">
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
                      {/* Hiển thị danh sách lô hàng */}
                      <span className="text-primary font-medium m-2 my-auto">
                        Các lô hàng:{" "}
                      </span>
                      <div className="m-2 flex flex-wrap justify-start">
                        {batchList.map((batch) => (
                          <div
                            key={batch.batchid}
                            className={`p-4 rounded-lg mr-4 my-4 shadow-lg cursor-pointer border hover:opacity-80 transition duration-300 ease-in-out transform hover:scale-105 ${
                              batchId === batch.batchid ? "bg-primary text-white" : "bg-fourth"
                            }`}
                            onClick={() => setBatchId(batchId === batch.batchid ? "" : batch.batchid)}
                          >
                            <div className="mb-2">
                              <span
                                className={`font-medium mr-1 ${
                                  batchId === batch.batchid ? "text-white" : "text-primary"
                                }`}
                              >
                                Mã lô hàng:{" "}
                              </span>
                              <span
                                className={`font-semibold ${
                                  batchId === batch.batchid ? "text-white" : ""
                                }`}
                              >
                                {batch.batchid.substring(0, 8)}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span
                                className={`font-medium mr-1 ${
                                  batchId === batch.batchid ? "text-white" : "text-primary"
                                }`}
                              >
                                Giá:{" "}
                              </span>
                              <span
                                className={`font-semibold ${
                                  batchId === batch.batchid ? "text-white" : ""
                                }`}
                              >
                                {Number(batch.batchprice).toLocaleString()} ({batch.unitofmeasure})
                              </span>
                            </div>
                            <div className="mb-2">
                              <span
                                className={`font-medium mr-1 ${
                                  batchId === batch.batchid ? "text-white" : "text-primary"
                                }`}
                              >
                                Giảm giá:{" "}
                              </span>
                              <span
                                className={`font-semibold ${
                                  batchId === batch.batchid ? "text-white" : ""
                                }`}
                              >
                                {batch.promotion} %
                              </span>
                            </div>
                            <div className="mb-2">
                              <span
                                className={`font-medium mr-1 ${
                                  batchId === batch.batchid ? "text-white" : "text-primary"
                                }`}
                              >
                                Tình trạng:{" "}
                              </span>
                              <span
                                className={`font-semibold ${
                                  batchId === batch.batchid ? "text-white" : ""
                                }`}
                              >
                                {batch.batchquality}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span
                                className={`font-medium mr-1 ${
                                  batchId === batch.batchid ? "text-white" : "text-primary"
                                }`}
                              >
                                Số lượng còn lại:{" "}
                              </span>
                              <span
                                className={`font-semibold ${
                                  batchId === batch.batchid ? "text-white" : ""
                                }`}
                              >
                                {batch.batchquantity}
                              </span>
                            </div>
                            {/* <div className="mb-2">
                              <span
                                className={`font-medium mr-1 ${
                                  batchId === batch.batchid ? "text-white" : "text-primary"
                                }`}
                              >
                                Ngày hết hạn:{" "}
                              </span>
                              <span
                                className={`font-semibold ${
                                  batchId === batch.batchid ? "text-white" : ""
                                }`}
                              >
                                {formatDate(batch.expirydate)}
                              </span>
                            </div> */}
                          </div>
                        ))}
                      </div>
                      <div className="flex m-2 w-3/4">
                        <button
                          className="bg-primary text-white font-bold px-4 py-3 rounded-md mt-4 w-1/2 shadow-xl hover:opacity-90"
                          onClick={handleAddToCart}
                          disabled={isAddingToCart} 
                        >
                          
                            <>
                              Thêm vào giỏ hàng
                              <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="ml-2"
                              />
                            </>
                          
                        </button>
                        <button
                          className="bg-primary text-white font-bold px-4 py-3 rounded-md mt-4 w-1/2 shadow-xl hover:opacity-90 ml-7"
                          onClick={() => navigate("/cart")}
                        >
                          Mua ngay{" "}
                          <FontAwesomeIcon
                            icon={faMoneyBillWave}
                            className="ml-2"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-7 shadow-lg">
              <h1 className="font-bold text-primary text-2xl">
                Thông tin chi tiết về sản phẩm
              </h1>
            </div>

            <div className="w-4/5 mx-auto bg-white rounded-lg p-6 mt-5 shadow-xl space-y-6">
              <p className="text-justify text-base font-medium text-gray-700 leading-relaxed">
                {product.overviewdes}
              </p>

              {product.healtbenefit && (
                <>
                  <p className="text-justify text-xl font-bold text-primary">
                    Lợi ích đối với sức khỏe
                  </p>
                  <p className="text-justify text-base font-medium text-gray-700 leading-relaxed">
                    {product.healtbenefit}
                  </p>
                </>
              )}

              {product.storagemethod && (
                <>
                  <p className="text-justify text-xl font-bold text-primary">
                    Phương pháp bảo quản sản phẩm
                  </p>
                  <p className="text-justify text-base font-medium text-gray-700 leading-relaxed">
                    {product.storagemethod}
                  </p>
                </>
              )}

              {product.cookingmethod && (
                <>
                  <p className="text-justify text-xl font-bold text-primary">
                    Phương pháp chế biến sản phẩm
                  </p>
                  <p className="text-justify text-base font-medium text-gray-700 leading-relaxed">
                    {product.cookingmethod}
                  </p>
                </>
              )}
            </div>

            <div className="w-4/5 mx-auto bg-secondary rounded-md p-5 mt-7 shadow-2xl">
              <h1 className="font-bold text-primary text-2xl">
                Bình luận, đánh giá về sản phẩm
              </h1>
            </div>
            <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-7 shadow-2xl">
              <CommentShow />
            </div>
            {/* <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-7 shadow-2xl">
              <h1 className="font-bold text-primary text-2xl">
                Sản phẩm liên quan
              </h1>
            </div>
            <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-7 shadow-2xl"></div> */}
          </div>
        )
      )}
      <FooterCustomer />
    </>
  );
}
