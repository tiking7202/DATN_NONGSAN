const pool = require("../config/dbConnect");
const bcrypt = require("bcryptjs");

const { storage } = require("../config/firebase");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// Cấu hình Multer để xử lý upload
const upload = multer({
  storage: multer.memoryStorage(),
});

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
/*
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
*/

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
  const {
    userId,
    username,
    email,
    fullname,
    street,
    commune,
    district,
    province,
    phonenumber,
    indentitycard,
    dob,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE "User" SET username = $1, email = $2, fullname = $3, street = $4, commune = $5, district = $6, province = $7, phonenumber = $8, indentitycard = $9, dob = $10 WHERE userid = $11`,
      [
        username,
        email,
        fullname,
        street,
        commune,
        district,
        province,
        phonenumber,
        indentitycard,
        dob,
        userId,
      ]
    );
    res.json({
      message: "Cập nhật thông tin thành công",
      result: result.rows[0],
    });
  } catch (error) {
    console.error("Error changing info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAvatarFarm = async (req, res) => {
  const { userId } = req.params;
  try {
    const avatar = req.file;
    let avatarUrl = null;
    if (avatar) {
      const avatarBuffer = avatar.buffer;
      const avatarFilename = `avatars/${uuidv4()}`;
      const avatarRef = ref(storage, avatarFilename);

      await uploadBytes(avatarRef, avatarBuffer, {
        contentType: avatar.mimetype,
      });
      avatarUrl = await getDownloadURL(avatarRef);

      const newAvatar = await pool.query(
        `UPDATE "User" SET avatar = $1 WHERE userid = $2 RETURNING *`,
        [avatarUrl, userId]
      );
      res.json({
        message: "Avatar đã được cập nhật thành công",
        data: newAvatar.rows[0],
      });
    }
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeAvatarCustomer = async (req, res) => {
  const { userId } = req.params;
  try {
    const avatar = req.file;
    let avatarUrl = null;
    if (avatar) {
      const avatarBuffer = avatar.buffer;
      const avatarFilename = `avatars/${uuidv4()}`;
      const avatarRef = ref(storage, avatarFilename);

      await uploadBytes(avatarRef, avatarBuffer, {
        contentType: avatar.mimetype,
      });
      avatarUrl = await getDownloadURL(avatarRef);

      const newAvatar = await pool.query(
        `UPDATE "User" SET avatar = $1 WHERE userid = $2 RETURNING *`,
        [avatarUrl, userId]
      );
      res.json({
        message: "Avatar đã được cập nhật thành công",
        data: newAvatar.rows[0],
      });
    }
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserById,
  changePassword,
  changeInfo,
  upload,
  updateAvatarFarm,
  changeAvatarCustomer,
};
