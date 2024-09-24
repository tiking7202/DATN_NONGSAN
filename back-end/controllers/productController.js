const pool = require("../config/dbConnect");

const { storage } = require("../config/firebase");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// Cấu hình Multer để xử lý upload
const upload = multer({
  storage: multer.memoryStorage(),
});
exports.upload = upload;
// Lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        f.farmname, 
        f.farmprovince 
      FROM 
        product p
      JOIN 
        farm f 
      ON 
        p.farmid = f.farmid
      WHERE 
        p.isvisibleweb = true
    `;
    const productsWithFarm = await pool.query(query);
    res.json(productsWithFarm.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy sản phẩm có trong category theo id
exports.getProductsByCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        p.*, 
        f.farmname, 
        f.farmprovince, 
        c.categoryname 
      FROM 
        product p
      JOIN 
        farm f 
      ON 
        p.farmid = f.farmid
      JOIN 
        category c 
      ON 
        p.categoryid = c.categoryid
      WHERE 
        p.categoryid = $1 AND p.isvisibleweb = true
    `;
    const productsWithFarm = await pool.query(query, [id]);
    res.json(productsWithFarm.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy sản phẩm theo id
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate that the id is a valid UUID
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const query = `
      SELECT 
        p.*, 
        c.categoryname, 
        f.farmname, 
        f.farmprovince 
      FROM 
        product p
      JOIN 
        category c 
      ON 
        p.categoryid = c.categoryid
      JOIN 
        farm f 
      ON 
        p.farmid = f.farmid
      WHERE 
        p.productid = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Tìm kiếm sản phẩm
exports.searchProduct = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    // Validate that the search input is a valid string
    if (typeof search !== "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const query = `
      SELECT 
        p.*, 
        f.farmname, 
        f.farmprovince 
      FROM 
        product p
      JOIN 
        farm f 
      ON 
        p.farmid = f.farmid
      WHERE 
        p.productname ILIKE $1 AND p.isvisibleweb = true
    `;
    const productsWithFarm = await pool.query(query, [`%${search}%`]);
    res.json(productsWithFarm.rows);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy tất cả sản phẩm theo farmid mà chỉ có productid
exports.getProductsByProductId = async (req, res) => {
  const { productid } = req.params;
  try {
    const farmQuery = await pool.query(
      "SELECT farmid FROM product WHERE productid = $1",
      [productid]
    );

    if (farmQuery.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const farmid = farmQuery.rows[0].farmid;

    const products = await pool.query(
      "SELECT * FROM product WHERE farmid = $1",
      [farmid]
    );

    if (products.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this farm ID" });
    }

    res.json(products.rows);
  } catch (error) {
    console.error("Error fetching products by product ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy tất cả sản phẩm theo farmid
exports.getProductsByFarmId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        p.*, 
        f.farmname, 
        f.farmprovince 
      FROM 
        product p
      JOIN 
        farm f 
      ON 
        p.farmid = f.farmid
      WHERE 
        p.farmid = $1 AND p.isvisibleweb = true
    `;
    const productsWithFarm = await pool.query(query, [id]);
    if (productsWithFarm.rows.length === 0) {
      return res
        .status(409)
        .json({ message: "No products found for this farm ID" });
    }
    res.json(productsWithFarm.rows);
  } catch (error) {
    console.error("Error fetching products by farm ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// farmer controller

// Lấy tất cả sản phẩm theo farmid
exports.getAllProductsByFarmId = async (req, res) => {
  const { userid } = req.params;
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  try {
    // Lấy tổng số sản phẩm theo userid
    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM product p
        JOIN farm f ON p.farmid = f.farmid
        WHERE f.userid = $1`,
      [userid]
    );
    const totalProducts = parseInt(totalResult.rows[0].count, 10);

    // Lấy sản phẩm theo userid với phân trang
    const result = await pool.query(
      `SELECT p.*, c.categoryname, f.farmname 
        FROM product p
        JOIN farm f ON p.farmid = f.farmid
        JOIN category c ON p.categoryid = c.categoryid
        WHERE f.userid = $1
        LIMIT $2 OFFSET $3`,
      [userid, limit, offset]
    );

    // Nếu không có sản phẩm nào thì trả về thông báo
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm nào" });
    }

    // Trả về danh sách sản phẩm cùng với thông tin phân trang
    res.json({
      products: result.rows,
      pagination: {
        totalProducts,
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products by farm ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  const {
    productname,
    categoryid,
    farmid,
    productquantity,
    unitofmeasure,
    productprice,
    overviewdes,
    expirydate,
    healtbenefit,
    cookingmethod,
    storagemethod,
    productsize,
    isdistributorview,
    plantingdate, 
    harvestdate
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (
    !productname ||
    !categoryid ||
    !farmid ||
    !productquantity ||
    !unitofmeasure ||
    !productprice ||
    !overviewdes ||
    !expirydate ||
    !productsize ||
    !isdistributorview ||
    !plantingdate ||
    !harvestdate
  ) {
    return res.status(400).json({ message: "Các trường ko được để trống" });
  }

  try {
    // Upload images to Firebase
    const uploadImage = async (image) => {
      if (!image) return null;
      const imageBuffer = image.buffer;
      const imageFileName = `products/${productname}/${uuidv4()}`;
      const imageRef = ref(storage, imageFileName);

      await uploadBytes(imageRef, imageBuffer, { contentType: image.mimetype });
      return await getDownloadURL(imageRef);
    };

    const productImage1Url = await uploadImage(req.files.productimage1 ? req.files.productimage1[0] : null);
    const productImage2Url = await uploadImage(req.files.productimage2 ? req.files.productimage2[0] : null);
    const productImage3Url = await uploadImage(req.files.productimage3 ? req.files.productimage3[0] : null);

    // Tạo sản phẩm mới
    const newProduct = await pool.query(
      `INSERT INTO product (productname, productimage1, productimage2, productimage3, categoryid, farmid, productquantity, unitofmeasure, productprice, overviewdes, expirydate, healtbenefit, cookingmethod, storagemethod, productsize, isdistributorview, promotion, productquality, isvisibleweb, plantingdate, harvestdate) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING *`,
      [
        productname,
        productImage1Url,
        productImage2Url,
        productImage3Url,
        categoryid,
        farmid,
        productquantity,
        unitofmeasure,
        productprice,
        overviewdes,
        expirydate,
        healtbenefit,
        cookingmethod,
        storagemethod,
        productsize,
        isdistributorview,
        0,
        "Tươi",
        false,
        plantingdate,
        harvestdate
      ]
    );

    // Trả về thông tin sản phẩm vừa tạo
    res.json({
      product: newProduct.rows[0],
      message: "Tạo sản phẩm thành công",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Sửa thông tin sản phẩm
exports.updateProduct = async (req, res) => {
  const { productid } = req.params;
  const {
    productname,
    categoryid,
    farmid,
    productquantity,
    unitofmeasure,
    productprice,
    overviewdes,
    expirydate,
    healtbenefit,
    cookingmethod,
    storagemethod,
    isdistributorview,
    productsize,
    plantingdate,
    harvestdate
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (
    !productname ||
    !categoryid ||
    !farmid ||
    !productquantity ||
    !unitofmeasure ||
    !productprice ||
    !overviewdes ||
    !expirydate ||
    !productsize ||
    !plantingdate ||
    !harvestdate 
  ) {
    return res.status(400).json({ message: "Các trường ko được để trống" });
  }
  const productImages = req.files;

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const productQuery = await pool.query(
      "SELECT * FROM product WHERE productid = $1",
      [productid]
    );
    if (productQuery.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }
    const existingProduct = productQuery.rows[0];
    // Upload images to Firebase
    const uploadImage = async (image) => {
      if (!image) return null;
      const imageBuffer = image.buffer;
      const imageFileName = `products/${existingProduct.productname}/${uuidv4()}`;
      const imageRef = ref(storage, imageFileName);

      await uploadBytes(imageRef, imageBuffer, { contentType: image.mimetype });
      return await getDownloadURL(imageRef);
    };

    // Upload images to Firebase if they exist in the request
    const productImage1Url = productImages.productimage1 ? await uploadImage(productImages.productimage1[0]) : existingProduct.productimage1;
    const productImage2Url = productImages.productimage2 ? await uploadImage(productImages.productimage2[0]) : existingProduct.productimage2;
    const productImage3Url = productImages.productimage3 ? await uploadImage(productImages.productimage3[0]) : existingProduct.productimage3;

    // Sửa thông tin sản phẩm
    const updatedProduct = await pool.query(
      `UPDATE product
        SET productname = $1, productimage1 = $2, productimage2 = $3, productimage3 = $4, categoryid = $5, farmid = $6, productquantity = $7, unitofmeasure = $8, productprice = $9, overviewdes = $10, expirydate = $11, healtbenefit = $12, cookingmethod = $13, storagemethod = $14, isdistributorview = $15, productsize = $16, plantingdate = $17, harvestdate = $18
        WHERE productid = $19
        RETURNING *`,
      [
        productname,
        productImage1Url,
        productImage2Url,
        productImage3Url,
        categoryid,
        farmid,
        productquantity,
        unitofmeasure,
        productprice,
        overviewdes,
        expirydate,
        healtbenefit,
        cookingmethod,
        storagemethod,
        isdistributorview,
        productsize,
        plantingdate,
        harvestdate,
        productid,
      ]
    );

    // Trả về thông tin sản phẩm vừa sửa
    res.json({
      product: updatedProduct.rows[0],
      message: "Sửa sản phẩm thành công",
    });
  } catch (error) {
    console.error("error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  const { productid } = req.params;

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const productQuery = await pool.query(
      "SELECT * FROM product WHERE productid = $1",
      [productid]
    );
    if (productQuery.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    // Xóa sản phẩm
    await pool.query("DELETE FROM product WHERE productid = $1", [productid]);

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// distributor controller
exports.getAllProductsToDistributor = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  try {
    // Lấy tổng số sản phẩm
    const totalProductsResult = await pool.query(
      "SELECT COUNT(*) FROM product"
    );
    const totalProducts = parseInt(totalProductsResult.rows[0].count, 10);

    // Lấy sản phẩm với thông tin farmname và categoryname
    const productsQuery = `
      SELECT p.*, f.farmname, c.categoryname
      FROM product p
      JOIN farm f ON p.farmid = f.farmid
      JOIN category c ON p.categoryid = c.categoryid
      WHERE p.isdistributorview = true
      LIMIT $1 OFFSET $2
    `;
    const productsResult = await pool.query(productsQuery, [limit, offset]);

    res.json({
      products: productsResult.rows,
      pagination: {
        totalProducts,
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cập nhật chất lượng sản phẩm
exports.updateProductQuality = async (req, res) => {
  const { productid } = req.params;
  const { productquality } = req.body;

  try {
    // Cập nhật chất lượng sản phẩm và kiểm tra sự tồn tại của sản phẩm trong một truy vấn duy nhất
    const updateQuery = `
      UPDATE product 
      SET productquality = $1 
      WHERE productid = $2 
      RETURNING *;
    `;
    const result = await pool.query(updateQuery, [productquality, productid]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({
      message: "Cập nhật chất lượng sản phẩm thành công",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating product quality:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Ẩn hiện sản phẩm trên trang chủ
exports.updateProductVisibility = async (req, res) => {
  const { productid } = req.params;
  const { isVisible } = req.body;

  try {
    // Cập nhật trạng thái ẩn hiện sản phẩm và kiểm tra sự tồn tại của sản phẩm trong một truy vấn duy nhất
    const updateQuery = `
      UPDATE product 
      SET isvisibleweb = $1 
      WHERE productid = $2 
      RETURNING *;
    `;
    const result = await pool.query(updateQuery, [isVisible, productid]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({
      message: "Cập nhật trạng thái sản phẩm thành công",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating product visibility:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cập nhật giá sản phẩm
exports.updateProductPrice = async (req, res) => {
  const { productid } = req.params;
  const { productprice } = req.body;

  try {
    const updateQuery = `
      UPDATE product 
      SET productprice = $1 
      WHERE productid = $2 
      RETURNING *;
    `;
    const result = await pool.query(updateQuery, [productprice, productid]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({
      message: "Cập nhật giá sản phẩm thành công",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating product price:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cập nhật giảm giá sản phẩm
exports.updateProductPromotion = async (req, res) => {
  const { productid } = req.params;
  const { promotion } = req.body;

  try {
    const updateQuery = `
      UPDATE product 
      SET promotion = $1 
      WHERE productid = $2 
      RETURNING *;
    `;
    const result = await pool.query(updateQuery, [promotion, productid]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({
      message: "Cập nhật giảm giá sản phẩm thành công",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating product promotion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
