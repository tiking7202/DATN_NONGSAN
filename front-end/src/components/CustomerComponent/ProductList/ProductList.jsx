import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTractor,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import ProductBatchDialog from "../ProductBatchDialog/ProductBatchDialog";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { toast } from "react-toastify";
import { addToCart } from "../../../service/CustomerService/cartService";
import { jwtDecode } from "jwt-decode";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const [isOpenProductBatchDialog, setIsOpenProductBatchDialog] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const onAddToCart = async (product) => {
    try {
      // Lấy danh sách các lô hàng của sản phẩm đó
      const response = await axios.get(
        `${API_BASE_URL}/product-batch/${product.productid}`
      );
      const productBatchs = response.data;

      // Nếu chỉ có 1 lô hàng thì thêm luôn vào giỏ hàng
      if (productBatchs.length === 1) {
        const batchId = productBatchs[0].batchid;
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("Đăng nhập để thêm vào giỏ hàng!");
          navigate("/login");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userid;
        await addToCart(product.productid, userId, 1, batchId);
        toast.success("Thêm vào giỏ hàng thành công!");
      } else {
        setIsOpenProductBatchDialog(true);
        setSelectedProduct(product);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  return (
    <div className="bg-secondary m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 px-3 rounded-lg">
      {products.map((product) => {
        return (
          <div
            key={product.productid}
            className="bg-fourth rounded-lg overflow-hidden shadow-2xl m-3 cursor-pointer transform transition duration-500 hover:shadow-3xl"
          >
            <Link to={`/product/${product.productid}`} key={product.productid}>
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
                <div className="flex justify-center mb-2">
                  <p className="font-bold text-center text-2xl">
                    {product.productname}
                  </p>
                </div>
                <p className="text-sm m-2 text-primary">
                  Trạng thái sản phẩm:{" "}
                  <span className="text-primary font-bold">
                    {product.batchquantity ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>
                <div className="flex justify-between m-3">
                  {product.promotion > 0 && (
                    <del className="text-xl italic text-green-500">
                      {Number(product.batchprice).toLocaleString("vi-VN")}đ
                    </del>
                  )}
                  <p className="text-3xl text-left font-bold">
                    {(
                      product.batchprice -
                      product.batchprice * product.promotion * 0.01
                    ).toLocaleString("vi-VN")}
                    đ
                  </p>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/farm/info/${product.farmid}`}>
                  <div className="text-primary font-bold italic">
                    <div className="flex items-center hover:opacity-90 hover:underline">
                      <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                      <p className="ml-2">{product.farmprovince}</p>
                    </div>
                    <div className="flex items-center mt-2 hover:opacity-90 hover:underline">
                      <FontAwesomeIcon icon={faTractor} size="lg" />
                      <p className="ml-2">{product.farmname}</p>
                    </div>
                  </div>
                </Link>

                <button
                  className="p-4 bg-white text-primary rounded-full hover:bg-primary hover:text-white hover:scale-125 transform transition duration-300 ease-in-out hover:shadow-md"
                  onClick={() => onAddToCart(product)}
                >
                  <FontAwesomeIcon icon={faCartPlus} size="2x" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {isOpenProductBatchDialog && (
        <ProductBatchDialog
          onClose={() => setIsOpenProductBatchDialog(false)}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
