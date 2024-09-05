import HeaderDistributor from "../../components/HeaderDistributor";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEye,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../front-end/src/config/config";
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/truncaseText";
import { ToastContainer } from "react-toastify";
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

  return (
    <div>
      <HeaderDistributor />
      <ToastContainer />
      <div className="bg-secondary w-full mt-24">
        <div className="my-4">
          <div className="my-4 w-11/12">
            <button
              className="bg-primary ml-40 px-4 py-2 text-secondary font-bold rounded-xl"
              // onClick={openCreateProductDialog}
            >
              <FontAwesomeIcon icon={faPlus} className="text-xl mr-2" />
              Thêm sản phẩm
            </button>
          </div>
          <table className="w-10/12 mx-auto rounded-lg">
            <thead className="">
              <tr className="bg-primary text-secondary border border-black">
                <th className="py-3 w-1/12">Tên sản phẩm</th>
                <th className="py-3 w-1/12">Hình ảnh</th>
                <th className="py-3 w-1/12">Danh mục</th>
                <th className="py-3 w-1/12">Trang trại</th>
                <th className="py-3 w-1/12">Số lượng</th>
                <th className="py-3 w-1/12">Giá</th>
                <th className="py-3 w-1/12">Chất lượng</th>
                <th className="py-3 w-1/12">Ngày hết hạn</th>
                <th className="py-3 w-2/12">Mô tả</th>
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
                    </td>
                    <td className="w-1/12 text-center">
                      <img
                        src={product.productimage1}
                        alt={product.productname}
                        className="h-14 w-5/6 m-auto"
                      />
                    </td>
                    <td className="w-1/12 text-center">
                      {product.categoryname}
                    </td>
                    <td className="w-1/12 text-center">{product.farmname}</td>
                    <td className="w-1/12 text-center">
                      {product.productquantity} {product.unitofmeasure}
                    </td>
                    <td className="w-1/12 text-center">
                      {product.productprice} VNĐ
                    </td>
                    <td className="w-1/12 text-center">
                      {product.productquality}
                    </td>
                    <td className="w-1/12 text-center">
                      {formatDate(product.expirydate)}
                    </td>
                    <td className="w-2/12 text-center">
                      {truncateText(product.overviewdes, 40)}
                    </td>
                    <td className="w-1/12 text-center">
                      {product.isvisibleweb ? "Không" : "Có"}
                    </td>
                    <td className="w-2/12 text-center">
                      <div className="flex justify-center">
                        <button className="font-bold mx-3">
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-xl mr-2"
                          />
                        </button>
                        <button className="font-bold mx-3">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-xl mr-2"
                          />
                        </button>
                        <button className="font-bold mx-3">
                          <FontAwesomeIcon
                            icon={faRemove}
                            className="text-xl mr-2"
                          />
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
    </div>
  );
}
