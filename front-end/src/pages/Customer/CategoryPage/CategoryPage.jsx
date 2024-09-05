import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTractor,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import FooterCustomer from "../../../components/CustomerComponent/FooterCustomer/FooterCustomer";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { addToCart } from "../../../service/CustomerService/cartService";

function CategoryPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/category/${id}/product`
      );
      setProducts(response.data);
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = (productId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.userid;

      addToCart(productId, userId, 1)
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
    <>
      <HeaderCustomer />
      <div className="bg-fourth">
        <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-32">
          {products && products.length > 0 ? (
            <h1 className="font-bold text-primary text-2xl">
              Danh mục sản phẩm: {products[0].category}
            </h1>
          ) : (
            <h1 className="font-bold text-primary text-2xl">
              Danh Mục chưa có sản phẩm nào
            </h1>
          )}
        </div>
        <div className="rounded-sm w-4/5 bg-white m-auto flex flex-wrap justify-center mt-5">
          {products.map((product) => {
            const currentDate = new Date();
            const expireDate = new Date(product.expirydate);
            const remainingTime = expireDate - currentDate;
            const remainingDays = Math.floor(
              remainingTime / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={product.productid}
                className="bg-fourth max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1"
              >
                <Link
                  to={`/product/${product.productid}`}
                  key={product.productid}
                >
                  <img
                    className="w-full h-64 object-cover hover:opacity-80"
                    src={product.productimage1}
                    alt={product.productname}
                  />
                </Link>
                <div className="px-3 py-2 text-primary">
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
                        {product.productquantity}kg
                      </span>
                    </p>
                    <div className="flex justify-between  m-3">
                      <del className="text-2xl italic text-green-500">
                        {product.productprice}đ
                      </del>
                      <p className="text-2xl text-left font-bold">
                        {product.productprice -
                          product.productprice * product.promotion * 0.01}
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
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon icon={faTractor} size="lg" />
                          <p className="ml-2">{product.farmname}</p>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="p-4 bg-white text-primary rounded-full hover:bg-primary-dark transition duration-200"
                      onClick={() => handleAddToCart(product.productid)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} size="2x" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <FooterCustomer />
      </div>
    </>
  );
}

export default CategoryPage;
