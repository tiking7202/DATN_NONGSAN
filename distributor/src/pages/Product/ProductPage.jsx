import HeaderDistributor from "../../components/HeaderDistributor";
import {
  faChevronLeft,
  faChevronRight,
  faEye,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../front-end/src/config/config";
import { truncateText } from "../../utils/truncaseText";
import { toast, ToastContainer } from "react-toastify";
import DetailProductDialog from "./DetailProductDialog";
import CreateProductBatch from "./CreateProductBatch";
import DetailProductBatch from "./DetailProductBatch";
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

  // const handleQualityChange = async (productId, newQuality) => {
  //   try {
  //     const response = await axios.patch(
  //       `${API_BASE_URL}/distributor/update/productquality/${productId}`,
  //       {
  //         productquality: newQuality,
  //       }
  //     );
  //     toast.success(response.data.message);
  //     //set lại state cho product
  //     setProducts((prevProducts) => {
  //       return prevProducts.map((product) => {
  //         if (product.productid === productId) {
  //           return {
  //             ...product,
  //             productquality: newQuality,
  //           };
  //         }
  //         return product;
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error updating product quality:", error);
  //   }
  // };

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

  // const [editingProductId, setEditingProductId] = useState(null);
  // const [newPrice, setNewPrice] = useState("");
  // const handleEditClick = (productid, currentPrice) => {
  //   setEditingProductId(productid);
  //   setNewPrice(currentPrice);
  // };

  // const handlePriceChange = (e) => {
  //   setNewPrice(e.target.value);
  // };

  // const handleSaveClick = async (productid) => {
  //   try {
  //     const response = await axios.patch(
  //       `${API_BASE_URL}/distributor/update/productprice/${productid}`,
  //       { productprice: newPrice }
  //     );
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product.productid === productid
  //           ? { ...product, productprice: newPrice }
  //           : product
  //       )
  //     );
  //     setEditingProductId(null);
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.error("Error updating product price:", error);
  //     toast.error("Failed to update product price");
  //   }
  // };

  // const handlePromotionChange = async (productid, newPromotion) => {
  //   try {
  //     const response = await axios.patch(
  //       `${API_BASE_URL}/distributor/update/promotion/${productid}`,
  //       { promotion: newPromotion }
  //     );
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product.productid === productid
  //           ? { ...product, promotion: newPromotion }
  //           : product
  //       )
  //     );
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.error("Error updating product promotion:", error);
  //     toast.error("Failed to update product promotion");
  //   }
  // };

  // const handleIncreasePromotion = (productid, currentPromotion) => {
  //   const newPromotion = currentPromotion + 1;
  //   handlePromotionChange(productid, newPromotion);
  // };

  // const handleDecreasePromotion = (productid, currentPromotion) => {
  //   const newPromotion = currentPromotion - 1;
  //   handlePromotionChange(productid, newPromotion);
  // };
  const [isOpenCreateProductBatch, setIsOpenCreateProductBatch] =
    useState(false);
  const [producid, setProducid] = useState(null);
  const openCreateProductBatch = (productid) => {
    setIsOpenCreateProductBatch(true);
    setProducid(productid);
  };

  const [isOpenDetailProductBatch, setIsOpenDetailProductBatch] =
    useState(false);
  const [selectedProductBatch, setSelectedProductBatch] = useState([]);
  const onOpenDetailProductBatch = async (productid) => {
    setIsOpenDetailProductBatch(true);

    // gọi api lấy danh sách lô hàng
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product-batch/${productid}`
      );
      setSelectedProductBatch(response.data);
      console.log(selectedProductBatch);
    } catch (error) {
      console.error("Error fetching product batch:", error);
    }
  };

  return (
    <div>
      <HeaderDistributor />
      <ToastContainer />
      <div className="bg-secondary w-full mt-24">
        <div className="my-4">
          <div className="my-4 w-9/12 ml-56 px-4 flex justify-between">
            <h1 className="text-primary font-bold text-3xl">
              Danh sách sản phẩm
            </h1>
            <div className="relative w-1/4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="w-full p-2 border rounded-lg placeholder-color pr-5 text-primary border-black"
              />
              <button className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2  py-1 bg-primary text-white rounded-lg">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <table className="w-9/12 mx-auto rounded-lg shadow-xl border border-black">
            <thead className="">
              <tr className="bg-primary text-secondary rounded-lg border border-black">
                <th className="py-3 w-1/12">Tên sản phẩm</th>
                <th className="py-3 w-1/12">Hình ảnh</th>
                <th className="py-3 w-1/12">Danh mục</th>
                <th className="py-3 w-2/12">Trang trại</th>
                <th className="py-3 w-3/12">Mô tả</th>
                <th className="py-3 w-2/12">Ẩn sản phẩm</th>
                <th className="py-3 w-1/12">Các lô hàng</th>

                <th className="py-3 w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.productid}
                    className="text-center font-medium border border-black"
                  >
                    <td className="w-1/12 text-center p-2">
                      {product.productname}
                      <br />
                    </td>
                    <td className="w-1/12 text-center p-2">
                      <img
                        src={product.productimage1}
                        alt={product.productname}
                        className="h-16 w-full m-auto"
                      />
                    </td>
                    <td className="w-1/12 text-center p-2">
                      {product.categoryname}
                    </td>
                    <td className="w-2/12 text-center p-2">
                      {product.farmname}
                    </td>
                    <td className="w-3/12 text-justify">
                      {truncateText(product.overviewdes, 70)}
                    </td>

                    <td className="w-2/12 text-center p-2">
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
                    <td className="w-1/12 text-center p-2">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="hover:opacity-50 mx-2 cursor-pointer"
                        size="xl"
                        onClick={() =>
                          onOpenDetailProductBatch(product.productid)
                        }
                      />
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="hover:opacity-50 mx-2 cursor-pointer"
                        size="xl"
                        onClick={() =>
                          openCreateProductBatch(product.productid)
                        }
                      />
                    </td>
                    <td className="w-1/12 text-center p-2">
                      <div className="flex justify-center">
                        <button
                          className="font-bold mx-3 text-primary hover:opacity-80"
                          onClick={() =>
                            onOpenDetailProductDialog(product.productid)
                          }
                        >
                          Chi tiết
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
      {isOpenCreateProductBatch && (
        <CreateProductBatch
          onClose={() => setIsOpenCreateProductBatch(false)}
          producid={producid}
        />
      )}
      {isOpenDetailProductBatch && (
        <DetailProductBatch
          onClose={() => setIsOpenDetailProductBatch(false)}
          selectedProductBatch={selectedProductBatch}
        />
      )}
    </div>
  );
}
