const pool = require("../config/dbConnect");
// Các điều kiện set isvisibleweb = false cho product
exports.setVisiblityFalse = async () => {
  try {
    const result = await pool.query(`
      UPDATE product
      SET isvisibleweb = false
      WHERE NOT EXISTS (
        SELECT 1
        FROM product_batch
        WHERE product_batch.productid = product.productid
      )
      OR isdistributorview = false
    `);

    console.log("Product visibility updated successfully👍");
    return result.rowCount;
  } catch (error) {
    console.error("Error updating product visibility:", error);
    throw error;
  }
};
