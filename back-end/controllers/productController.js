const pool = require("../config/dbConnect");

// lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM product");
    // Lấy thêm farmname và farmprovince
    const productsWithFarm = await Promise.all(
      products.rows.map(async (product) => {
        const farm = await pool.query(
          "SELECT * FROM farm WHERE farmid = $1",
          [product.farmid]
        );
        return { ...product, farmname: farm.rows[0].farmname, farmprovince: farm.rows[0].farmprovince };
      })
    );
    res.json(productsWithFarm);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy sản phẩm có trong category theo id
exports.getProductsByCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await pool.query(
      "SELECT * FROM category WHERE categoryid = $1",
      [id]
    );
    const products = await pool.query(
      "SELECT * FROM product WHERE categoryid = $1",
      [id]
    );
    const productsWithFarm = await Promise.all(
      products.rows.map(async (product) => {
        const farm = await pool.query(
          "SELECT * FROM farm WHERE farmid = (SELECT farmid FROM product WHERE productid = $1)",
          [product.productid]
        );
        return {
          ...product,
          farm: farm.rows[0],
          category: category.rows[0].categoryname,
        };
      })
    );
    res.json(productsWithFarm);
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
        const product = await pool.query('SELECT * FROM product WHERE productid = $1', [id]);
        if (product.rows.length === 0) {
            return res.status(400).json({ message: 'Product not found' });
        }
        category = await pool.query('SELECT * FROM category WHERE categoryid = $1', [product.rows[0].categoryid]);
        farm = await pool.query('SELECT * FROM farm WHERE farmid = $1', [product.rows[0].farmid]);
        // tra ve product va categoryname
        res.json({ ...product.rows[0], categoryname: category.rows[0].categoryname, farmname: farm.rows[0].farmname, farmprovince: farm.rows[0].farmprovince  });
        
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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
    // const trimmedSearch = search.trim();
    const products = await pool.query(
      "SELECT * FROM product WHERE productname ILIKE $1",
      [`%${search}%`]
    );
    // Lấy thêm farmname và farmprovince
    const productsWithFarm = await Promise.all(
      products.rows.map(async (product) => {
        const farm = await pool.query(
          "SELECT * FROM farm WHERE farmid = $1",
          [product.farmid]
        );
        return { ...product, farmname: farm.rows[0].farmname, farmprovince: farm.rows[0].farmprovince };
      })
    );
    res.json(productsWithFarm);
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
    const products = await pool.query(
      "SELECT * FROM product WHERE farmid = $1",
      [id]
    );
    if (products.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this farm ID" });
    }
    res.json(products.rows);
  } catch (error) {
    console.error("Error fetching products by farm ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// farmer controller

// Lấy tất cả sản phẩm theo farmid
exports.getAllProductsByFarmId = async (req, res) => {
  const { userid } = req.params;
  const { page = 1, pageSize = 10 } = req.query; // Lấy tham số phân trang từ query, mặc định page = 1 và pageSize = 10

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
    productimage1,
    productimage2,
    productimage3,
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
  } = req.body;

  // Kiểm tra dữ liệu đầu vào 
  if ( !productname || !categoryid || !farmid || !productquantity || !unitofmeasure || !productprice || !overviewdes || !expirydate ) { return res.status(400).json({ message: 'Các trường ko được để trống' }); }

  try {
    // Tạo sản phẩm mới
    const newProduct = await pool.query(
      `INSERT INTO product (productname, productimage1, productimage2, productimage3, categoryid, farmid, productquantity, unitofmeasure, productprice, overviewdes, expirydate, healtbenefit, cookingmethod, storagemethod)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
      [
        productname,
        productimage1,
        productimage2,
        productimage3,
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
      ]
    );

    // Trả về thông tin sản phẩm vừa tạo
    res.json({ product: newProduct.rows[0], message: "Tạo sản phẩm thành công" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Sửa thông tin sản phẩm
exports.updateProduct = async (req, res) => {
  const { productid } = req.params;
  const {
    productname,
    productimage1,
    productimage2,
    productimage3,
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
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if ( !productname || !categoryid || !farmid || !productquantity || !unitofmeasure || !productprice || !overviewdes || !expirydate ) { return res.status(400).json({ message: 'Các trường ko được để trống' }); }

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const productQuery = await pool.query('SELECT * FROM product WHERE productid = $1', [productid]);
    if (productQuery.rows.length === 0) {
      return res.status(400).json({ message: 'Không tìm thấy sản phẩm' });
    }
    // Sửa thông tin sản phẩm
    const updatedProduct = await pool.query(
      `UPDATE product
        SET productname = $1, productimage1 = $2, productimage2 = $3, productimage3 = $4, categoryid = $5, farmid = $6, productquantity = $7, unitofmeasure = $8, productprice = $9, overviewdes = $10, expirydate = $11, healtbenefit = $12, cookingmethod = $13, storagemethod = $14
        WHERE productid = $15
        RETURNING *`,
      [
        productname,
        productimage1,
        productimage2,
        productimage3,
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
        productid,
      ]
    );

    // Trả về thông tin sản phẩm vừa sửa
    res.json({ product: updatedProduct.rows[0], message: 'Sửa sản phẩm thành công' });
  } catch (error) {
    console.error('error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  const { productid } = req.params;

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const productQuery = await pool.query('SELECT * FROM product WHERE productid = $1', [productid]);
    if (productQuery.rows.length === 0) {
      return res.status(400).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Xóa sản phẩm
    await pool.query('DELETE FROM product WHERE productid = $1', [productid]);

    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}