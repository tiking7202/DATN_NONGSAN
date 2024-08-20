const pool = require("../config/dbConnect");
const bcrypt = require("bcryptjs");
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

const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM "User" WHERE userid = $1`, [
      userId,
    ]);
    //hash password
    const validPassword = await bcrypt.compare(
      oldPassword,
      user.rows[0].password
    );
    if (!validPassword) {
      return res.status(400).send("Mật khẩu cũ không chính xác");
    }
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .send("Mật khẩu mới không được tùng với mật khẩu cũ");
    }
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await pool.query(`UPDATE "User" SET password = $1 WHERE userid = $2`, [
      newHashedPassword,
      userId,
    ]);
    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeInfo = async (req, res) => {
  const { userId, username, email, fullname, street, commune, district, province, phonenumber, indentitycard, dob } = req.body;
  try {
    const result = await pool.query(
      `UPDATE "User" SET username = $1, email = $2, fullname = $3, street = $4, commune = $5, district = $6, province = $7, phonenumber = $8, indentitycard = $9, dob = $10 WHERE userid = $11`,
      [username, email, fullname, street, commune, district, province, phonenumber, indentitycard, dob, userId]
    );
    res.json({ message: "Cập nhật thông tin thành công",  result: result.rows[0] });
  } catch (error) {
    console.error("Error changing info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserById,
  changePassword,
  changeInfo,
};
