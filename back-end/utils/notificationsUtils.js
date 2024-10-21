const pool = require("../config/dbConnect");

// Các loại thông báo
// 1. Thông báo về việc đăng ký tài khoản của nông dân cho distributor
// 2. Thông báo về việc đăng sản phẩm của nông dân cho distributor
// 3. Thông báo về khuyến mãi của sản phẩm cho khách hàng
// 4. Thông báo về việc đặt hàng của khách hàng cho distributor
// 5. Thông báo đơn hang đã được xác nhận của distributor cho khách hàng
// 6. Thông báo đơn hàng đã được giao cho khách hàng

// Hàm dùng để tạo thông báo mới
exports.createNotification = async (
  useridOrDistributorId, // Có thể là userid hoặc distributorid
  userRole, // Phân biệt là 'User' hay 'Distributor'
  title,
  message,
  notificationtype
) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (
      !useridOrDistributorId ||
      !userRole ||
      !title ||
      !message ||
      !notificationtype
    ) {
      throw new Error("Các trường không được để trống");
    }

    // Kiểm tra vai trò của người nhận (User hoặc Distributor)
    let query = "";
    let values = [];

    if (userRole === "User") {
      // Nếu người nhận là User
      query = `INSERT INTO notifications (userid, title, message, notificationtype, created_at) 
              VALUES ($1, $2, $3, $4, NOW())
               RETURNING *`;
      values = [useridOrDistributorId, title, message, notificationtype];
    } else if (userRole === "Distributor") {
      // Nếu người nhận là Distributor
      query = `INSERT INTO notifications (distributorid, title, message, notificationtype, created_at) 
              VALUES ($1, $2, $3, $4, NOW())
              RETURNING *`;
      values = [useridOrDistributorId, title, message, notificationtype];
    } else {
      throw new Error("Vai trò người nhận không hợp lệ");
    }

    // Tạo thông báo mới
    const newNotification = await pool.query(query, values);

    return newNotification.rows[0];
  } catch (error) {
    console.error(error.message);
    throw new Error("Server Error");
  }
};
