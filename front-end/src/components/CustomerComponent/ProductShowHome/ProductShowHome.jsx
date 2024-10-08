import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTractor,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import { toast } from "react-toastify";
import { addToCart } from "../../../service/CustomerService/cartService";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../Loading.jsx";

export default function ProductShowHome() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy user_id từ localStorage
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userid);
    } else {
      const randomUserId = uuidv4();
      setUserId(randomUserId);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/recommendation/${userId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleAddToCart = (productId, batchId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.userid;

      addToCart(productId, userId, 1, batchId)
        .then((response) => {
          response;
          toast.success("Thêm vào giỏ hàng thành công!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="bg-secondary m-auto flex flex-wrap justify-center py-6 rounded-lg shadow-2xl">
      {loading ? (
        <Loading />
      ) : (
        products.map((product) => {
          const currentDate = new Date();
          const expireDate = new Date(product.expirydate);
          const remainingTime = expireDate - currentDate;
          const remainingDays = Math.floor(
            remainingTime / (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={product.productid}
              className="w-1/4 bg-fourth max-w-xs rounded overflow-hidden shadow-2xl m-4 cursor-pointer"
            >
              <Link
                to={`/product/${product.productid}`}
                key={product.productid}
              >
                <img
                  className="w-full h-64 object-cover transition duration-500 ease-in-out transform hover:scale-110"
                  src={product.productimage1}
                  alt={product.productname}
                />
              </Link>
              <div className="px-6 py-4 text-primary">
                <Link
                  to={`/product/${product.productid}`}
                  key={product.productid}
                >
                  <div className="flex justify-center mb-2 ">
                    <p className="font-bold text-center text-2xl">
                      {product.productname}
                      <span className="ml-2 my-auto text-sm font-normal italic block">
                        {product.productquality}
                      </span>
                    </p>
                  </div>

                  <p className="m-2 text-primary">
                    Hạn sử dụng còn:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {remainingDays} ngày
                    </span>
                  </p>
                  <p className="text-sm m-2 text-primary">
                    Số lượng còn lại:{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {product.batchquantity}{" "}
                      <span className="text-sm italic">({product.unitofmeasure})</span>
                    </span>
                  </p>
                  <div className="flex justify-between  m-3">
                    <del className="text-xl italic text-green-500">
                      {Number(product.batchprice)}đ
                    </del>
                    <p className="text-3xl text-left font-bold">
                      {(product.batchprice) -
                        (product.batchprice) * product.promotion * 0.01}
                      đ
                    </p>
                  </div>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/farm/info/${product.farmid}`}>
                    <div className="text-primary font-bold italic">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                        <p className="ml-2">{product.farmprovince}</p>
                      </div>
                      <div className="flex items-center mt-2 hover:opacity-90">
                        <FontAwesomeIcon icon={faTractor} size="lg" />
                        <p className="ml-2">{product.farmname}</p>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="p-4 bg-white text-primary rounded-full hover:bg-primary-dark transition duration-200"
                    onClick={() => handleAddToCart(product.productid, product.batchid)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} size="2x" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
