import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMapMarkerAlt,
  faTractor,
} from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../../service/CustomerService/cartService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import HeaderCustomer from "../../../components/CustomerComponent/HeaderCustomer/HeaderCustomer";
import FooterCustomer from "./../../../components/CustomerComponent/FooterCustomer/FooterCustomer";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const productSearch = location.state.productSearch;

  const handleAddToCart = (productId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Đăng nhập để thêm vào giỏ hàng!", {
        position: "top-right",
        time: 500,
      });
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.userid;

      addToCart(productId, userId, 1)
        .then((response) => {
          response;
          toast.success("Thêm vào giỏ hàng thành công!", {
            position: "top-right",
            time: 500,
          });
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
    <div className="bg-fourth">
      <HeaderCustomer />

      <div className="w-4/5 mx-auto bg-white rounded-md p-5 mt-32">
        {productSearch && productSearch.length > 0 ? (
          <h1 className="font-bold text-primary text-2xl">
            Sản phẩm tìm được...
          </h1>
        ) : (
          <h1 className="font-bold text-primary text-2xl">
            Không tìm thấy sản phẩm nào!
          </h1>
        )}
      </div>

      <div className="rounded-sm w-4/5 bg-white m-auto flex flex-wrap justify-center mt-5">
        {productSearch.map((product) => {
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
                      {product.productquantity}kg{" "}
                      <span className="text-sm">/kg</span>
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
  );
}

export default SearchPage;
