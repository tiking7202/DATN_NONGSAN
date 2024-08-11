const pool = require("../config/dbConnect");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    if(quantity === 0) {
      return res.status(400).json({ message: "Số lượng sản phẩm phải lớn hơn 0" });
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
  const { userId } = req.body;
  try {
    const cart = await pool.query("SELECT * FROM cart WHERE userid = $1", [
      userId,
    ]);

    // Get product details for each item in the cart
    for (let i = 0; i < cart.rows.length; i++) {
      const product = await pool.query(
        "SELECT * FROM product WHERE productid = $1",
        [cart.rows[i].productid]
      );
      quantity =  await pool.query(
        "SELECT quantity FROM cart WHERE productid = $1",
        [cart.rows[i].productid]
      );
      cart.rows[i] = {
        ...product.rows[0],
        quantity: quantity.rows[0].quantity,
      };
    }
    res.status(200).json(cart.rows);
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
}

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
