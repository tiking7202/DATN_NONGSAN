import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// import { useEffect} from "react";

const CreateCategory = ({ onClose, refreshCategoryList }) => {
  const [categoryname, setCategoryname] = useState("");
  const [categoryimage, setCategoryimage] = useState("");
  const [categorydes, setCategorydes] = useState("");
  //   const [farmid, setFarmid] = useState("");

  const [categorynameErrol, setCategorynameErrol] = useState("");
  // const [categoryimageErrol, setCategoryimageErrol] = useState("");
  const [categorydesErrol, setCategorydesErrol] = useState("");
  //   const [farmidError, setFarmidError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (categoryname.trim() === "") {
      setCategorynameErrol("Tên danh mục không được để trống");
      isValid = false;
    } else {
      setCategorynameErrol("");
    }

    if (categorydes.trim() === "") {
      setCategorydesErrol("Mô tả không được để trống");
      isValid = false;
    } else {
      setCategorydesErrol("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const categorydata = new FormData();
    categorydata.append("categoryname", categoryname);
    categorydata.append("categorydes", categorydes);
    categorydata.append("categoryimage", categoryimage);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/distributor/create/category`,
        categorydata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        onClose();
        if (toast && typeof toast.success === "function") {
          toast.success("Thêm category thành công");
          refreshCategoryList();
        } else {
          console.error("Toast is not properly initialized");
        }
      }
      // Reset form fields after successful submission
      setCategoryname("");
      setCategoryimage("");
      setCategorydes("");
    } catch (error) {
      console.error("Error creating crop:", error);
      toast.error(error.response.data, {
        position: "top-right",
        time: 500,
      });
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center m-auto">
      <div className="bg-white px-3 rounded w-1/2 m-auto text-primary h-3/5 overflow-auto shadow-xl">
        <div className="flex justify-end">
          <button
            className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-3xl text-center font-bold">
          Thêm Danh Mục Sản Phẩm
        </h2>
        <div className="py-4">
          {/* 1 */}
          <div className="flex justify-between my-2">
            <div className="w-1/2 mx-2">
              <label
                htmlFor="categoryname"
                className="block text-xl text-primary font-bold mb-2"
              >
                Tên danh mục
              </label>
              <input
                id="categoryname"
                type="text"
                placeholder="Tên danh mục"
                value={categoryname}
                onChange={(e) => setCategoryname(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
              {categorynameErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {categorynameErrol}
                </p>
              )}
            </div>
            <div className="w-1/2 mx-2">
              <label
                htmlFor="categoryimage"
                className="block text-xl text-primary font-bold mb-2"
              >
                Hình ảnh
              </label>
              <input
                id="categoryimage"
                type="file"
                placeholder="Hình ảnh"
                onChange={(e) => setCategoryimage(e.target.files[0])}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
              />
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
                id="categorydes"
                placeholder="Mô tả"
                type="text"
                value={categorydes}
                onChange={(e) => setCategorydes(e.target.value)}
                className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500  h-28  "
              />
              {categorydesErrol && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {categorydesErrol}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end my-2">
            <button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary-700 text-white text-xl font-bold py-2 px-4 rounded-xl mx-2 mt-5"
            >
              Thêm danh mục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  //   userId: PropTypes.string.isRequired,
  refreshCategoryList: PropTypes.func.isRequired,
};

export default CreateCategory;
