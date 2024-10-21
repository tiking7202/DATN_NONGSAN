// CreateProduct.jsx
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/config";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

const CreateProduct = ({ onClose, userId, refreshProductList }) => {
  const [productname, setProductname] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [farmid, setFarmid] = useState("");
  const [productimage1, setProductimage1] = useState("");
  const [productimage2, setProductimage2] = useState("");
  const [productimage3, setProductimage3] = useState("");
  const [overviewdes, setOverviewdes] = useState("");
  const [storagemethod, setStoragemethod] = useState("");
  const [healtbenefit, setHealtbenefit] = useState("");
  const [cookingmethod, setCookingmethod] = useState("");
  const [isdistributorview, setIsdistributorview] = useState(false);

  //error state
  const [productnameError, setProductnameError] = useState("");
  const [categoryidError, setCategoryidError] = useState("");
  const [farmidError, setFarmidError] = useState("");
  const [productimage1Error, setProductimage1Error] = useState("");
  const [productimage2Error, setProductimage2Error] = useState("");
  const [productimage3Error, setProductimage3Error] = useState("");
  const [overviewdesError, setOverviewdesError] = useState("");
  const [storagemethodError, setStoragemethodError] = useState("");
  const [healthbenefitError, setHealtbenefitError] = useState("");
  const [cookingmethodError, setCookingmethodError] = useState("");

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [farms, setFarms] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await axios.get(`${API_BASE_URL}/category`);

        let categoriesData = category.data;
        setCategories(categoriesData);
        const farm = await axios.get(`${API_BASE_URL}/farm/user/${userId}`);
        let farmsData = farm.data;
        setFarms(farmsData);
        setFarmid(farmsData.farmid);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [userId]);

  //validate form
  const validateForm = () => {
    if (productname === "") {
      setProductnameError("Tên sản phẩm không được để trống");
      return false;
    } else {
      setProductnameError("");
    }
    if (categoryid === "") {
      setCategoryidError("Danh mục không được để trống");
      return false;
    } else {
      setCategoryidError("");
    }
    if (farmid === "") {
      setFarmidError("Trang trại không được để trống");
      return false;
    } else {
      setFarmidError("");
    }
    if (productimage1 === "") {
      setProductimage1Error("Hình ảnh không được để trống");
      return false;
    } else {
      setProductimage1Error("");
    }
    if (productimage2 === "") {
      setProductimage2Error("Hình ảnh không được để trống");
      return false;
    } else {
      setProductimage2Error("");
    }
    if (productimage3 === "") {
      setProductimage3Error("Hình ảnh không được để trống");
      return false;
    } else {
      setProductimage3Error("");
    }
    if (overviewdes === "") {
      setOverviewdesError("Mô tả không được để trống");
      return false;
    } else {
      setOverviewdesError("");
    }
    if (storagemethod === "") {
      setStoragemethodError("Phương pháp bảo quản không được để trống");
      return false;
    } else {
      setStoragemethodError("");
    }
    if (healtbenefit === "") {
      setHealtbenefitError("Lợi ích đối với sức khỏe không được để trống");
      return false;
    } else {
      setHealtbenefitError("");
    }
    if (cookingmethod === "") {
      setCookingmethodError("Phương pháp chế biến không được để trống");
      return false;
    } else {
      setCookingmethodError("");
    }
    return true;
  };
  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      const productData = new FormData();
      productData.append("productname", productname);
      productData.append("categoryid", categoryid);
      productData.append("farmid", farmid);
      productData.append("productimage1", productimage1);
      productData.append("productimage2", productimage2);
      productData.append("productimage3", productimage3);
      productData.append("overviewdes", overviewdes);
      productData.append("storagemethod", storagemethod);
      productData.append("healtbenefit", healtbenefit);
      productData.append("cookingmethod", cookingmethod);
      productData.append("isdistributorview", isdistributorview);

      // Gửi yêu cầu API tạo sản phẩm
      const response = await axios.post(
        `${API_BASE_URL}/farmer/create/product`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        onClose();
        if (toast && typeof toast.success === "function") {
          toast.success("Thêm sản phẩm thành công");
          refreshProductList();
        } else {
          console.error("Toast is not properly initialized");
        }
      }
      console.log(response);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center m-auto">
      <div className="bg-white p-6 rounded w-1/2 m-auto text-primary h-3/4 overflow-auto shadow-xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex justify-end">
              <button
                className="text-primary px-2 hover:bg-primary hover:text-secondary hover:px-2 text-3xl font-bold fixed"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <h2 className="text-3xl text-center font-bold">Thêm sản phẩm</h2>
            <div className="py-4">
              {/* 1 */}
              <div className="flex justify-between my-2">
                <div className="w-full mx-2">
                  <label
                    htmlFor="productname"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    id="productname"
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={productname}
                    onChange={(e) => setProductname(e.target.value)}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                  />
                  {productnameError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {productnameError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="category"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Danh mục
                  </label>
                  <select
                    id="category"
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    onChange={(e) => setCategoryid(e.target.value)}
                  >
                    <option value="" className="bg-secondary">
                      Chọn danh mục
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryid}
                        value={category.categoryid}
                        className="bg-secondary"
                      >
                        {category.categoryname}
                      </option>
                    ))}
                  </select>
                  {categoryidError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {categoryidError}
                    </p>
                  )}
                </div>
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="productimage1"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Hình ảnh 1
                  </label>
                  <input
                    id="productimage1"
                    type="file"
                    placeholder="Hình ảnh 1"
                    // value={productimage1}
                    onChange={(e) => setProductimage1(e.target.files[0])}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                  />
                  {productimage1Error && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {productimage1Error}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="productimage2"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Hình ảnh 2
                  </label>
                  <input
                    id="productimage2"
                    placeholder="Hình ảnh 2"
                    type="file"
                    // value={productimage2}
                    onChange={(e) => setProductimage2(e.target.files[0])}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                  />
                  {productimage2Error && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {productimage2Error}
                    </p>
                  )}
                </div>
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="productimage3"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Hình ảnh 3
                  </label>
                  <input
                    id="productimage3"
                    placeholder="Hình ảnh 3"
                    type="file"
                    // value={productimage3}
                    onChange={(e) => setProductimage3(e.target.files[0])}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                  />
                  {productimage3Error && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {productimage3Error}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between my-2">
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="farm"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Trang trại
                  </label>
                  <input
                    type="text"
                    id="farm"
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    value={farms.farmname}
                    disabled
                  />
                  {farmidError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {farmidError}
                    </p>
                  )}
                </div>
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="productquantity"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Hiển thị cho nhà phân phối
                  </label>
                  <select
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500"
                    onChange={(e) => setIsdistributorview(e.target.value)}
                  >
                    <option value="false" className="bg-secondary">
                      Không
                    </option>
                    <option value="true" className="bg-secondary">
                      Có
                    </option>
                  </select>
                </div>
              </div>

              {/* 4 */}
              <div className="flex justify-between my-2">
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="overviewdes"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    id="overviewdes"
                    placeholder="Mô tả sản phẩm"
                    value={overviewdes}
                    onChange={(e) => setOverviewdes(e.target.value)}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500 h-40"
                  />
                  {overviewdesError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {overviewdesError}
                    </p>
                  )}
                </div>
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="storagemethod"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Phương pháp bảo quản
                  </label>
                  <textarea
                    id="storagemethod"
                    placeholder="Phương pháp bảo quản"
                    value={storagemethod}
                    onChange={(e) => setStoragemethod(e.target.value)}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500 h-40"
                  />
                  {storagemethodError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {storagemethodError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="healthbenefit"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Lợi ích đối với sức khỏe
                  </label>
                  <textarea
                    id="healthbenefit"
                    placeholder="Lợi ích đối với sức khỏe"
                    value={healtbenefit}
                    onChange={(e) => setHealtbenefit(e.target.value)}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500 h-40"
                  />
                  {healthbenefitError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {healthbenefitError}
                    </p>
                  )}
                </div>
                <div className="w-1/2 mx-2">
                  <label
                    htmlFor="cookingmethod"
                    className="block text-xl text-primary font-bold mb-2"
                  >
                    Phương pháp chế biến
                  </label>
                  <textarea
                    id="cookingmethod"
                    placeholder="Phương pháp chế biến"
                    value={cookingmethod}
                    onChange={(e) => setCookingmethod(e.target.value)}
                    className="bg-fourth text-base text-primary p-2 rounded-xl w-full border border-gray-500 h-40"
                  />
                  {cookingmethodError && (
                    <p className="text-red-500 mt-1 text-xs italic">
                      {cookingmethodError}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end my-2">
                <button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary-700 text-white text-xl font-bold py-2 px-4 rounded-xl mx-2 mt-2"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CreateProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  refreshProductList: PropTypes.func.isRequired,
};

export default CreateProduct;
