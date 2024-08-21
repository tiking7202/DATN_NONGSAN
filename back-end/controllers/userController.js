const pool = require("../config/dbConnect");

// lay thong tin user tu userId
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query(`SELECT * FROM "User" WHERE userid = $1`, [
      id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateFarmerProfile = async (req, res) => {
  const { id } = req.params; // Lấy userId từ URL params
  const {
    email,
    username,
    fullname,
    dob,
    phonenumber,
    indentitycard,
    street,
    commune,
    district,
    province,
  } = req.body; // Lấy dữ liệu mới từ request body

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const farmer = await pool.query(`SELECT * FROM "User" WHERE userid = $1`, [
      id,
    ]);
    if (farmer.rows.length === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Cập nhật thông tin người dùng (không bao gồm mật khẩu)
    const updatedFarmer = await pool.query(
      `UPDATE "User"
       SET email = $1, username = $2, fullname = $3, dob = $4,
           phonenumber = $5, indentitycard = $6, street = $7, commune = $8, district = $9, province = $10
       WHERE userid = $11
       RETURNING *`,
      [
        email,
        username,
        fullname,
        dob,
        phonenumber,
        indentitycard,
        street,
        commune,
        district,
        province,
        id,
      ]
    );

    res.json({
      message: "Thông tin đã được cập nhật thành công",
      data: updatedFarmer.rows[0],
    });
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật thông tin:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật thông tin" });
  }
};

exports.getUserById = getUserById;
