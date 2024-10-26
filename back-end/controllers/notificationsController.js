const pool = require("../config/dbConnect");

// Lấy tất cả thông báo của nhà phân phối
exports.getAllNotificationsDistributor = async (req, res) => {
  const { distributorid } = req.params;
  try {
    const query = `
      SELECT * FROM notifications
      WHERE distributorid = $1 AND is_read = false
      ORDER BY created_at DESC
    `;
    const notifications = await pool.query(query, [distributorid]);
    res.json(notifications.rows);
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy tất cả thông báo của người dùng
exports.getAllNotificationsUser = async (req, res) => {
  const { userid } = req.params;
  try {
    const query = `
      SELECT * FROM notifications
      WHERE userid = $1 AND is_read = false
      ORDER BY created_at DESC
    `;
    const notifications = await pool.query(query, [userid]);
    res.json(notifications.rows);
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update notification
exports.updateNotification = async (req, res) => {
  const { notificationid } = req.params;
  try {
    const query = `
      UPDATE notifications
      SET is_read = true
      WHERE notificationid = $1
      RETURNING *
    `;
    const updatedNotification = await pool.query(query, [notificationid]);
    res.json(updatedNotification.rows[0]);
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//lấy thông báo theo id
exports.getNotificationById = async (req, res) => {
  const { notificationid } = req.params;
  try {
    const query = `
      SELECT * FROM notifications
      WHERE notificationid = $1
    `;
    const notification = await pool.query(query, [notificationid]);
    res.json(notification.rows[0]);
  } catch (error) {
    console.error("Error getting notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
