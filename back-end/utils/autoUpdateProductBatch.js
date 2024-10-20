const moment = require('moment');
const pool = require("../config/dbConnect");

exports.autoUpdateProductBatch = async (req, res) => {
  try {
    const today = moment();

    // Truy vấn tất cả các lô hàng cùng với thông tin hạn sử dụng tiêu chuẩn của từng loại sản phẩm
    const res = await pool.query(`
      SELECT b.batchid, b.expirydate, b.batchquality, b.promotion, c.standardexpiry
      FROM product_batch b
      JOIN product p ON b.productid = p.productid
      JOIN category c ON p.categoryid = c.categoryid
    `);
    const batches = res.rows;

    const updatePromises = batches.map(async (batch) => {
      const expiryDate = moment(batch.expirydate);
      const standardExpiry = batch.standardexpiry; // Hạn sử dụng tiêu chuẩn theo loại
      const daysUntilExpiry = expiryDate.diff(today, 'days');
      
      let newQuality = batch.batchquality;
      let newPromotion = batch.promotion;

      // Điều chỉnh logic dựa vào hạn sử dụng tiêu chuẩn
      if (daysUntilExpiry > standardExpiry * 0.5) {
        newQuality = 'Tươi';
        newPromotion = 0;
      } else if (daysUntilExpiry <= standardExpiry * 0.5 && daysUntilExpiry > standardExpiry * 0.25) {
        newQuality = 'Tương đối tươi';
        newPromotion = 10;
      } else if (daysUntilExpiry <= standardExpiry * 0.25 && daysUntilExpiry > standardExpiry * 0.1) {
        newQuality = 'Bình thường';
        newPromotion = 25;
      } else if (daysUntilExpiry <= standardExpiry * 0.1 && daysUntilExpiry > 0) {
        newQuality = 'Sắp hết hạn';
        newPromotion = 50;
      } else if (daysUntilExpiry <= 0) {
        newQuality = 'Hết hạn';
        newPromotion = 70;
      }

      // Cập nhật nếu trạng thái hoặc giảm giá thay đổi
      if (newPromotion !== batch.batchquality || newPromotion !== batch.promotion) {
        await pool.query(
          'UPDATE product_batch SET batchquality = $1, promotion = $2 WHERE batchid = $3',
          [newQuality, newPromotion, batch.batchid]
        );
        
      }
    });

    // Chờ tất cả các truy vấn cập nhật hoàn thành
    await Promise.all(updatePromises);

    console.log('Product batches updated successfully👌');
  } catch (error) {
    console.error("Error updating product batch:", error);
  }
};