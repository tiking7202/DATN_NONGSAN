import HeaderDistributor from "../../components/HeaderDistributor";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../front-end/src/config/config";
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/truncaseText";
import { toast, ToastContainer } from "react-toastify";
import DetailProductDialog from "./DetailProductDialog";
export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/distributor/products`,
          {
            params: {
              page,
              pageSize,
            },
          }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [isOpenDetailProductDialog, setIsOpenDetailProductDialog] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const onOpenDetailProductDialog = async (productid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${productid}`);
      setIsOpenDetailProductDialog(true);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleQualityChange = async (productId, newQuality) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/distributor/update/productquality/${productId}`,
        {
          productquality: newQuality,
        }
      );
      toast.success(response.data.message);
      //set lại state cho product
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product.productid === productId) {
            return {
              ...product,
              productquality: newQuality,
            };
          }
          return product;
        });
      });
    } catch (error) {
      console.error("Error updating product quality:", error);
    }
  };

  const handleVisibilityChange = async (productid, newVisibility) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/distributor/update/isvisibleweb/${productid}`,
        { isVisible: newVisibility }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productid === productid
            ? { ...product, isvisibleweb: newVisibility }
            : product
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating product visibility:", error);
      toast.error("Failed to update product visibility");
    }
  };

  const [editingProductId, setEditingProductId] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const handleEditClick = (productid, currentPrice) => {
    setEditingProductId(productid);
    setNewPrice(currentPrice);
  };

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSaveClick = async (productid) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/distributor/update/productprice/${productid}`,
        { productprice: newPrice }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productid === productid
            ? { ...product, productprice: newPrice }
            : product
        )
      );
      setEditingProductId(null);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating product price:", error);
      toast.error("Failed to update product price");
    }
  };

  const handlePromotionChange = async (productid, newPromotion) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/distributor/update/promotion/${productid}`, { promotion: newPromotion });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productid === productid ? { ...product, promotion: newPromotion } : product
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating product promotion:", error);
      toast.error("Failed to update product promotion");
    }
  };

  const handleIncreasePromotion = (productid, currentPromotion) => {
    const newPromotion = currentPromotion + 1;
    handlePromotionChange(productid, newPromotion);
  };

  const handleDecreasePromotion = (productid, currentPromotion) => {
    const newPromotion = currentPromotion - 1;
    handlePromotionChange(productid, newPromotion);
  };

  return (
    <div>
      <HeaderDistributor />
      <ToastContainer />
      <div className="bg-secondary w-full mt-24">
        <div className="my-4">
          <div className="my-4 w-11/12 ml-24 px-4 text-primary font-bold text-3xl">
            Danh sách sản phẩm
          </div>
          <table className="w-11/12 mx-auto rounded-lg">
            <thead className="">
              <tr className="bg-primary text-secondary border border-black">
                <th className="py-3 w-1/12">Tên sản phẩm</th>
                <th className="py-3 w-1/12">Hình ảnh</th>
                <th className="py-3 w-1/12">Danh mục</th>
                <th className="py-3 w-1/12">Trang trại</th>
                <th className="py-3 w-1/12">Mô tả</th>
                <th className="py-3 w-1/12">Ngày hết hạn</th>
                <th className="py-3 w-1/12">Số lượng</th>
                <th className="py-3 w-1/12">Giá</th>
                <th className="py-3 w-1/12">Giảm giá</th>
                <th className="py-3 w-1/12">Chất lượng</th>
                <th className="py-3 w-1/12">Ẩn sản phẩm</th>
                <th className="py-3 w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.productid}
                    className="border border-black text-center font-medium"
                  >
                    <td className="w-1/12 text-center">
                      {product.productname}
                      <span className="text-xs font-normal">
                        {" "}
                        ({product.productsize})
                      </span>
                    </td>
                    <td className="w-1/12 text-center">
                      <img
                        src={product.productimage1}
                        alt={product.productname}
                        className="h-16 w-full m-auto"
                      />
                    </td>
                    <td className="w-1/12 text-center">
                      {product.categoryname}
                    </td>
                    <td className="w-1/12 text-center">{product.farmname}</td>
                    <td className="w-1/12 text-justify">
                      {truncateText(product.overviewdes, 30)}
                    </td>
                    <td className="w-1/12 text-center">
                      {formatDate(product.expirydate)}
                    </td>
                    <td className="w-1/12 text-center">
                      {product.productquantity} {product.unitofmeasure}
                    </td>
                    <td className="w-1/12 text-center">
                      {editingProductId === product.productid ? (
                        <>
                          <input
                            type="text"
                            value={newPrice}
                            onChange={handlePriceChange}
                            className="w-1/2 text-center"
                          />
                          <button
                            onClick={() => handleSaveClick(product.productid)}
                            className="bg-primary text-secondary ml-2 px-2 py-1 rounded-lg"
                          >
                            Lưu
                          </button>
                        </>
                      ) : (
                        <>
                          {product.productprice} VNĐ
                          <button
                            onClick={() =>
                              handleEditClick(
                                product.productid,
                                product.productprice
                              )
                            }
                            className="bg-primary text-secondary ml-2 px-2 py-1 rounded-lg"
                          >
                            Sửa
                          </button>
                        </>
                      )}
                    </td>
                    <td className="w-1/12 text-center">
                    <button
                        className="mx-2 rounded-full h-10 w-10 text-center hover:bg-slate-300"
                        onClick={() => handleDecreasePromotion(product.productid, product.promotion)}
                      >
                        -
                      </button>
                      {product.promotion}%
                      <button
                        className="mx-2 rounded-full h-10 w-10 hover:bg-slate-300"
                        onClick={() => handleIncreasePromotion(product.productid, product.promotion)}
                      >
                        +
                      </button>
                    </td>
                    <td className="w-1/12 text-center">
                      <select
                        value={product.productquality || ""}
                        onChange={(e) =>
                          handleQualityChange(product.productid, e.target.value)
                        }
                      >
                        <option value="Tươi" className="text-center p-2">
                          Tươi
                        </option>
                        <option
                          value="Tương đối tươi"
                          className="text-center p-2"
                        >
                          Tương đối tươi
                        </option>
                        <option value="Bình thường" className="text-center p-2">
                          Bình thường
                        </option>
                        <option
                          value="Cần sử dụng ngay"
                          className="text-center p-2"
                        >
                          Cần sử dụng ngay
                        </option>
                        <option value="Kém" className="text-center p-2">
                          Kém
                        </option>
                      </select>
                    </td>
                    <td className="w-1/12 text-center">
                      <select
                        value={product.isvisibleweb ? "visible" : "hidden"}
                        onChange={(e) =>
                          handleVisibilityChange(
                            product.productid,
                            e.target.value === "visible"
                          )
                        }
                      >
                        <option value="visible">Đã hiển thị</option>
                        <option value="hidden">Đã ẩn</option>
                      </select>
                    </td>
                    <td className="w-2/12 text-center">
                      <div className="flex justify-center">
                        <button
                          className="font-bold mx-3 text-primary hover:opacity-80"
                          onClick={() =>
                            onOpenDetailProductDialog(product.productid)
                          }
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">Không có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center my-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="text-primary border border-black font-bold px-4 py-2 rounded-l-xl"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {page > 1 && (
              <button
                className="text-primary border border-black font-bold px-4 py-2 "
                onClick={() => handlePageChange(page - 1)}
              >
                {page - 1}
              </button>
            )}
            <button className="bg-primary text-secondary border border-black font-bold px-4 py-2 ">
              {page}
            </button>
            {page < totalPages && (
              <button
                className="text-primary border border-black font-bold px-4 py-2 "
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            )}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="text-primary border border-black font-bold px-4 py-2 rounded-r-xl"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
      {isOpenDetailProductDialog && (
        <DetailProductDialog
          onClose={() => setIsOpenDetailProductDialog(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
