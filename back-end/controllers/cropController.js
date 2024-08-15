const pool = require("../config/dbConnect");

exports.getCropsByFarmId = async (req, res) => {
  const { id } = req.params;
  try {
    // Step 1: Get all productids associated with the farmid
    const products = await pool.query(
      "SELECT productid FROM product WHERE farmid = $1",
      [id]
    );

    if (products.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this farm" });
    }

    // Step 2: Extract productids into an array
    const productIds = products.rows.map((product) => product.productid);

    // Step 3: Fetch all crops associated with those productids
    const crops = await pool.query(
      "SELECT * FROM crop WHERE productid = ANY($1::uuid[])",
      [productIds]
    );

    res.json(crops.rows);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
