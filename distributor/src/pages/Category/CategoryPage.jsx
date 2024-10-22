import { useEffect, useState } from "react";
import HeaderDistributor from "../../components/HeaderDistributor";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import CategoryCreate from "./CategoryCreate";
import CategoryDetail from "./CategoryDetail";
import CategoryDelete from "./CategoryDelete";
import CategoryUpdate from "./CategoryUpdate";
import { toast, ToastContainer } from "react-toastify";
import { Pagination } from "../../../../front-end/src/components/Pagination";

export default function CategoryShow() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/distributor/categories`,
          {
            params: {
              page,
              pageSize,
            },
          }
        );
        setCategories(response.data.categories);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] =
    useState(false);
  const openCreateCategoryDialog = () => setIsCreateCategoryDialogOpen(true);

  const [isViewCategoryDialogOpen, setIsViewCategoryDialogOpen] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const openViewCategoryDialog = async (categoryid) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/distributor/categories/${categoryid}`
      );
      setIsViewCategoryDialogOpen(true);
      setSelectedCategory(response.data);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] =
    useState(false);
  const openEditCategoryDialog = async (categoryid) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/distributor/categories/${categoryid}`
      );
      setSelectedCategory(response.data);
      setIsEditCategoryDialogOpen(true);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const openDeleteCategoryDialog = (categoryid) => {
    setIsDeleteCategoryDialogOpen(true);
    setSelectedCategoryId(categoryid);
  };

  const refreshCategoryList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/distributor/categories`,
        {
          params: {
            page,
            pageSize,
          },
        }
      );
      const newCategories = response.data.categories;
      if (newCategories.length === 0 && page === 1) {
        toast.success("Không còn danh mục nào để hiển thị");
        return;
      }
      if (newCategories.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        setCategories(newCategories);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục:", error);
    }
  };

  return (
    <div>
      <HeaderDistributor />
      <div className="flex">
        <ToastContainer />
        <div className="bg-secondary w-full right-0 top-0 mt-20">
          <div className="w-10/12 m-auto bg-white rounded-lg px-3 mt-5">
            <div className="flex justify-between items-center my-3">
              <h2 className="my-4 px-4 text-primary font-bold text-3xl">
                Danh mục sản phẩm
              </h2>
              <button
                className="bg-primary hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg"
                onClick={openCreateCategoryDialog}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Thêm danh mục
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="w-1/6 py-2">Tên danh mục</th>
                    <th className="w-1/6 py-2">Hình ảnh</th>
                    <th className="w-1/6 py-2">Tiêu chuẩn hết hạn</th>
                    <th className="w-1/3 py-2">Mô tả</th>
                    <th className="w-1/6 py-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <tr
                        key={category.categoryid}
                        className="text-center font-medium border"
                      >
                        <td className="w-1/6">{category.categoryname}</td>
                        <td>
                          <img
                            src={category.categoryimage}
                            alt={category.categoryname}
                            className="w-2/3 h-16 m-auto"
                          />
                        </td>
                        <td className="py-2 px-4">{category.standardexpiry}</td>
                        <td className="py-2 px-4 text-justify">
                          {category.categorydes}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex justify-center space-x-4">
                            <button
                              className="text-black hover:text-primary px-1 text-2xl"
                              onClick={() =>
                                openViewCategoryDialog(category.categoryid)
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button
                              className="text-black hover:text-primary px-1 text-2xl"
                              onClick={() =>
                                openEditCategoryDialog(category.categoryid)
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="text-black hover:text-red-600 px-1 text-2xl"
                              onClick={() =>
                                openDeleteCategoryDialog(category.categoryid)
                              }
                            >
                              <FontAwesomeIcon icon={faRemove} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-3 px-4 text-center">
                        Không có danh mục nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      {isCreateCategoryDialogOpen && (
        <CategoryCreate
          onClose={() => {
            setIsCreateCategoryDialogOpen(false);
          }}
          refreshCategoryList={refreshCategoryList}
        />
      )}
      {isViewCategoryDialogOpen && (
        <CategoryDetail
          category={selectedCategory}
          onClose={() => setIsViewCategoryDialogOpen(false)}
        />
      )}
      {isEditCategoryDialogOpen && (
        <CategoryUpdate
          onClose={() => setIsEditCategoryDialogOpen(false)}
          category={selectedCategory}
          refreshCategoryList={refreshCategoryList}
        />
      )}
      {isDeleteCategoryDialogOpen && (
        <CategoryDelete
          onClose={() => setIsDeleteCategoryDialogOpen(false)}
          selectedCategoryId={selectedCategoryId}
          refreshCategoryList={refreshCategoryList}
        />
      )}
    </div>
  );
}
