const pool = require("../config/dbConnect");

// lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM product");
    res.json(products.rows);
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
        res.json({ ...product.rows[0], categoryname: category.rows[0].categoryname, farmprovince: farm.rows[0].farmprovince  });
        
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
    res.json(products.rows);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;
  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *",
      [name, price, categoryId]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryId } = req.body;
  try {
    const updatedProduct = await pool.query(
      "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *",
      [name, price, categoryId, id]
    );
    res.json(updatedProduct.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
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
