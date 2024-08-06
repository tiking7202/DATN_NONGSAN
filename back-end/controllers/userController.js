const pool = require("../config/dbConnect");

// lay thong tin user tu userId
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query(`SELECT * FROM "User" WHERE userid = $1`, [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUserById = getUserById;