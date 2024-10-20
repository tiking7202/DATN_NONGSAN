import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { API_BASE_URL } from "../../config/config";
import { toast } from "react-toastify";
// import { formatDate } from "../../../utils/formatDate";
export default function UpdateCategory({
  onClose,
  category,
  refreshCategoryList,
}) {
  const [categoryname, setCategoryname] = useState(category.categoryname);
  const [categoryimage, setCategoryimage] = useState(category.categoryimage);
  const [categorydes, setCategorydes] = useState(category.categorydes);
  const [standardexpiry, setStandardexpiry] = useState(category.standardexpiry);
  //   const [farmid, setFarmid] = useState("");

  const [categorynameErrol, setCategorynameErrol] = useState("");
  const [categorydesErrol, setCategorydesErrol] = useState("");
  const [standardexpiryErrol, setStandardexpiryErrol] = useState("");
  const validateForm = () => {
    let isValid = true;

    // Validate tên vụ mùa
    if (categoryname.trim() === "") {
      setCategorynameErrol("Tên danh mục là bắt buộc");
      isValid = false;
    } else {
      setCategorynameErrol("");
    }

    if (categorydes.trim() === "") {
      setCategorydesErrol("Mô tả vụ mùa là bắt buộc");
      isValid = false;
    } else {
      setCategorydesErrol("");
    }

    if (standardexpiry <= 0) {
      setStandardexpiryErrol("Tiêu chuẩn hết hạn là bắt buộc");
      isValid = false;
    } else {
      setStandardexpiryErrol("");
    }

    return isValid;
  };
  const onUpdateCategory = async (categoryid) => {
    if (!validateForm()) {
      return;
    }
    const categorydata = new FormData();
    categorydata.append("categoryname", categoryname);
    categorydata.append("categorydes", categorydes);
    categorydata.append("categoryimage", categoryimage);
    categorydata.append("standardexpiry", standardexpiry);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/distributor/update/category/${categoryid}`,
        categorydata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success("Cập nhật vụ mùa thành công");
        refreshCategoryList();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-2 rounded w-1/2 m-auto text-primary h-5/12 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold "
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">Cập nhật danh mục</h2>
        <div className="py-4">
          {/* 1 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label className="block text-xl text-primary font-bold mb-2">
                Tên danh mục
              </label>
              <input
                type="text"
                placeholder="Tên danh mục"
                value={categoryname}
                onChange={(e) => setCategoryname(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="text-red-500 mt-1 text-xs italic">
                {categorynameErrol}
              </p>
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="categoryimage"
                className="block text-xl text-primary font-bold mb-2"
              >
                Hình ảnh
              </label>
              <input
                type="file"
                placeholder="Hình ảnh"
                onChange={(e) => setCategoryimage(e.target.files[0])}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
            </div>
          </div>
          {/* 2 */}
          <div className="flex justify-between my-2">
            <div className="w-full mx-2">
              <label
                htmlFor="standardexpiry"
                className="block text-xl text-primary font-bold mb-2"
              >
                Tiêu chuẩn hết hạn
              </label>
              <input
                type="number"
                placeholder="Tiêu chuẩn hết hạn"
                value={standardexpiry}
                onChange={(e) => setStandardexpiry(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
              />
              <p className="text-red-500 mt-1 text-xs italic">
                {standardexpiryErrol}
              </p>
            </div>
          </div>

          {/* 5 */}
          <div className="flex justify-between my-2">
            <div className="w-full mx-2">
              <label
                htmlFor="categorydes"
                className="block text-xl text-primary font-bold mb-2"
              >
                Mô tả
              </label>
              <textarea
                type="text"
                placeholder="Mô tả"
                value={categorydes}
                onChange={(e) => setCategorydes(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500 h-28"
              />
              <p className="mt-1 text-red-500 text-xs italic">
                {categorydesErrol}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button
              className="bg-red-600 hover:opacity-90 text-white text-xl font-bold py-2 px-4 rounded-xl w-1/6"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              className="bg-primary hover:bg-primary-700 text-white text-xl font-bold py-2 px-4 rounded-xl ml-5 w-1/6"
              onClick={() => {
                onUpdateCategory(category.categoryid);
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateCategory.propTypes = {
  onClose: PropTypes.func,
  category: PropTypes.object,
  refreshCategoryList: PropTypes.func,
};
