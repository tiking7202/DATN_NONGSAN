import { useEffect, useState } from "react";
import HeaderDistributor from "../../components/HeaderDistributor";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEye,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import CategoryCreate from "./CategoryCreate";
import CategoryDetail from "./CategoryDetail";
import CategoryDelete from "./CategoryDelete";
import CategoryUpdate from "./CategoryUpdate";
import { toast } from "react-toastify";

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
        <div className="bg-secondary w-full h-screen right-0 top-0 mt-20">
          <div className="w-11/12 m-auto bg-white rounded-lg shadow-lg px-6 py-1 mt-5">
            <div className="flex justify-between items-center my-4">
              <h2 className="text-2xl font-bold">Danh mục sản phẩm</h2>
              <button
                className="bg-primary hover:bg-green-600 text-white px-4 py-2 rounded-lg"
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
                    <th className="w-1/6 py-3  border">Tên danh mục</th>
                    <th className="w-1/6 py-3  border">Hình ảnh</th>
                    <th className="w-1/2 py-3  border">Mô tả</th>
                    <th className="w-1/6 py-3  border">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <tr
                        key={category.categoryid}
                        className="text-center border border-black"
                      >
                        <td className="w-1/6">{category.categoryname}</td>
                        <td>
                          <img
                            src={category.categoryimage}
                            alt={category.categoryname}
                            className="w-1/2 h-20 m-auto"
                          />
                        </td>
                        <td className="py-3 px-4">{category.categorydes}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center space-x-4">
                            <button
                              className="text-black hover:text-blue-600 "
                              onClick={() =>
                                openViewCategoryDialog(category.categoryid)
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button
                              className="text-black hover:text-green-600 px-3"
                              onClick={() =>
                                openEditCategoryDialog(category.categoryid)
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="text-black hover:text-red-600"
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
            {/* Pagination */}
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
                  className="text-primary border border-black font-bold px-4 py-2"
                  onClick={() => handlePageChange(page - 1)}
                >
                  {page - 1}
                </button>
              )}
              <button className="bg-primary text-secondary border border-black font-bold px-4 py-2">
                {page}
              </button>
              {page < totalPages && (
                <button
                  className="text-primary border border-black font-bold px-4 py-2"
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
