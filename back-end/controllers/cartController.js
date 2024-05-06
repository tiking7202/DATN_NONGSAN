const pool = require("../config/dbConnect");

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const existingProduct = await pool.query(
      "SELECT * FROM cart WHERE userid = $1 AND productid = $2",
      [userId, productId]
    );
    if (existingProduct.rows.length > 0) {
      return res.status(400).json({ message: "Sản phẩm đã tồn tại trong giỏ hàng của bạn" });
    }
    const cart = await pool.query(
      "INSERT INTO cart (userid, productid) VALUES ($1, $2) RETURNING *",
      [userId, productId]
    );
    res.status(200).json(cart.rows[0]);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy tất cả sản phẩm trong giỏ hàng của người dùng
exports.getAllCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await pool.query(
      "SELECT * FROM cart WHERE userid = $1",
      [userId]
    );

    // Get product details for each item in the cart
    for (let i = 0; i < cart.rows.length; i++) {
      const product = await pool.query(
        "SELECT * FROM product WHERE productid = $1",
        [cart.rows[i].productid]
      );
      cart.rows[i] = product.rows[0];
    }
    res.status(200).json(cart.rows);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await pool.query(
      "DELETE FROM cart WHERE userid = $1 AND productid = $2",
      [userId, productId]
    );

    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};