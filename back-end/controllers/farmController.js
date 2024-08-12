const pool = require("../config/dbConnect");

// Lay tat ca farm
exports.getFarms = async (req, res) => {
  try {
    const farms = await pool.query("SELECT * FROM farm");
    res.json(farms.rows);
  } catch (error) {
    console.error("Error fetching farms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lay farm theo id
exports.getFarmById = async (req, res) => {
  const { id } = req.params;
  try {
    const farm = await pool.query("SELECT * FROM farm WHERE farmid = $1", [id]);
    res.json(farm.rows[0]);
  } catch (error) {
    console.error("Error fetching farm:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy farm theo productid
exports.getFarmByProductId = async (req, res) => {
  const { productid } = req.params;

  if (!productid)
    return res.status(400).json({ message: "Product ID is required" });

  try {
    const { rows } = await pool.query(
      "SELECT * FROM farm WHERE farmid = (SELECT farmid FROM product WHERE productid = $1)",
      [productid]
    );
    if (!rows[0])
      return res
        .status(404)
        .json({ message: "No farm found for this product ID" });

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching farm:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
