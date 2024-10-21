import { useEffect, useState } from "react";
import FarmerNavBar from "../../../components/FarmerComponent/FarmerNavBar/FarmerNavBar";
import HeaderFarmer from "../../../components/FarmerComponent/HeaderFarmer/HeaderFarmer";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { truncateText } from "../../../utils/truncaseText";
import CreateProduct from "./CreateProduct";
import FarmerDetailProduct from "./FarmerDetailProduct";
import FarmerDeleteProduct from "./FarmerDeleteProduct";
import FarmerUpdateProduct from "./FarmerUpdateProduct";
import { Pagination } from "../../../components/Pagination";

export default function FarmerShowProducts() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userid;

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/farmer/products/${userId}`,
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
  }, [userId, page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Dialog form tạo sản phẩm mới
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] =
    useState(false);
  const openCreateProductDialog = () => setIsCreateProductDialogOpen(true);

  //Dialog xem chi tiết sản phẩm
  const [isViewProductDialogOpen, setIsViewProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const openViewProductDialog = () => setIsViewProductDialogOpen(true);
  const openViewProductDialog = async (productid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${productid}`);
      setIsViewProductDialogOpen(true);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  //Dialog form chỉnh sửa sản phẩm
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const openEditProductDialog = async (productid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${productid}`);
      setSelectedProduct(response.data);
      setIsEditProductDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  //Dialog xác nhận xóa sản phẩm
  const [isDeleteProductDialogOpen, setIsDeleteProductDialogOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const openDeleteProductDialog = () => setIsDeleteProductDialogOpen(true);

  const refreshProductList = async () => {
    // Gọi API để lấy danh sách sản phẩm mới
    const response = await axios.get(
      `${API_BASE_URL}/farmer/products/${userId}`,
      {
        params: {
          page,
          pageSize,
        },
      }
    );
    setProducts(response.data.products);
  };

  return (
    <div>
      <HeaderFarmer />
      <div className="flex">
        <FarmerNavBar />
        <div className="bg-fourth w-5/6 h-screen fixed right-0 top-0 mt-20">
          <div className="w-10/12 m-auto bg-secondary rounded-lg px-7 py-1 mt-7 shadow-2xl">
            <div className="my-4">
              <button
                className="bg-primary px-4 py-2 text-secondary font-bold rounded-xl"
                onClick={openCreateProductDialog}
              >
                <FontAwesomeIcon icon={faPlus} className="text-xl mr-2" />
                Thêm sản phẩm
              </button>
            </div>

            <div className="my-4">
              <table className="w-full rounded-lg shadow-xl">
                <thead className="">
                  <tr className="bg-primary text-secondary border border-black">
                    <th className="py-3 w-2/12">Tên sản phẩm</th>
                    <th className="py-3 w-1/12">Hình ảnh</th>
                    <th className="py-3 w-1/12">Danh mục</th>
                    <th className="py-3 w-1/12">Trang trại</th>
                    <th className="py-3 w-4/12">Mô tả</th>
                    <th className="py-3 w-1/12">Hiển thị NPP</th>
                    <th className="py-3 w-2/12"></th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <tr
                        key={product.productid}
                        className="font-medium border border-black"
                      >
                        <td className="w-2/12 text-center">
                          {product.productname}
                        </td>
                        <td className="w-1/12 text-center m-auto">
                          <img
                            src={product.productimage1}
                            alt={product.productname}
                            className="h-14 w-5/6 m-auto"
                          />
                        </td>
                        <td className="w-1/12 text-center">
                          {product.categoryname}
                        </td>
                        <td className="w-1/12 text-center">
                          {product.farmname}
                        </td>

                        <td className="w-4/12 text-center">
                          {truncateText(product.overviewdes, 50)}
                        </td>

                        <td className="w-1/12 text-center">
                          {product.isdistributorview
                            ? "Có hiển thị"
                            : "Không hiển thị"}
                        </td>
                        <td className="w-1/6">
                          <div className="flex justify-center">
                            <button className="font-bold mx-3">
                              <FontAwesomeIcon
                                icon={faEye}
                                className="text-xl mr-2"
                                onClick={() =>
                                  openViewProductDialog(product.productid)
                                }
                              />
                            </button>
                            <button className="font-bold mx-3">
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="text-xl mr-2"
                                onClick={() =>
                                  openEditProductDialog(product.productid)
                                }
                              />
                            </button>
                            <button className="font-bold mx-3">
                              <FontAwesomeIcon
                                icon={faRemove}
                                className="text-xl mr-2"
                                onClick={() => {
                                  openDeleteProductDialog(product.productid);
                                  setSelectedProductId(product.productid);
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <div>No products available</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
      {isCreateProductDialogOpen && (
        <CreateProduct
          onClose={() => {
            setIsCreateProductDialogOpen(false);
          }}
          userId={userId}
          refreshProductList={refreshProductList}
        />
      )}
      {isViewProductDialogOpen && (
        <FarmerDetailProduct
          product={selectedProduct}
          onClose={() => setIsViewProductDialogOpen(false)}
        />
      )}
      {isEditProductDialogOpen && (
        <FarmerUpdateProduct
          onClose={() => setIsEditProductDialogOpen(false)}
          product={selectedProduct}
          userId={userId}
          refreshProductList={refreshProductList}
        />
      )}
      {isDeleteProductDialogOpen && (
        <FarmerDeleteProduct
          onClose={() => setIsDeleteProductDialogOpen(false)}
          selectedProductId={selectedProductId}
          refreshProductList={refreshProductList}
        />
      )}
    </div>
  );
}
