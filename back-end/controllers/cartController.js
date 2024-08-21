const pool = require("../config/dbConnect");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    if (quantity === 0) {
      return res
        .status(400)
        .json({ message: "Số lượng sản phẩm phải lớn hơn 0" });
    }
    const existingProduct = await pool.query(
      "SELECT * FROM cart WHERE userid = $1 AND productid = $2",
      [userId, productId]
    );
    if (existingProduct.rows.length > 0) {
      // Update the quantity if the product already exists in the cart
      const updatedCart = await pool.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE userid = $2 AND productid = $3 RETURNING *",
        [quantity, userId, productId]
      );
      return res.status(200).json(updatedCart.rows[0]);
    }
    const cart = await pool.query(
      "INSERT INTO cart (userid, productid, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, productId, quantity]
    );
    res.status(200).json(cart.rows[0]);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy tất cả sản phẩm trong giỏ hàng của người dùng
exports.getAllCart = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  try {
    // Fetch total count of cart items
    const totalCountResult = await pool.query(
      "SELECT COUNT(*) FROM cart WHERE userid = $1",
      [userId]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count);

    // Fetch cart items with pagination
    const cart = await pool.query(
      "SELECT * FROM cart WHERE userid = $1 LIMIT $2 OFFSET $3",
      [userId, pageSize, offset]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng của bạn đang trống" });
    }

    // Get product IDs from cart items
    const productIds = cart.rows.map((item) => item.productid);

    // Fetch product details and quantities in a single query
    const products = await pool.query(
      `SELECT p.*, c.quantity 
        FROM product p 
        JOIN cart c ON p.productid = c.productid 
        WHERE c.userid = $1 AND c.productid = ANY($2::uuid[])`,
      [userId, productIds]
    );

    // Map product details to cart items
    const cartItems = cart.rows.map((cartItem) => {
      const product = products.rows.find(
        (p) => p.productid === cartItem.productid
      );
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    });

    res.status(200).json({
      cartItems,
      pagination: {
        totalItems: totalCount,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateQuantityCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const updatedCart = await pool.query(
      "UPDATE cart SET quantity = $1 WHERE userid = $2 AND productid = $3 RETURNING *",
      [quantity, userId, productId]
    );
    res.status(200).json(updatedCart.rows[0]);
  } catch (error) {
    console.error("Error updating quantity in cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await pool.query("DELETE FROM cart WHERE userid = $1 AND productid = $2", [
      userId,
      productId,
    ]);

    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
