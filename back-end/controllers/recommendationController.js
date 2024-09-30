const axios = require("axios");
const pool = require("../config/dbConnect"); // Đảm bảo bạn đã kết nối đúng với cơ sở dữ liệu

const getRecommendation = async (req, res) => {
  const userId = req.params.userId || '16b9ab12-3876-4b2e-a983-57c491b9e3de'; // Lấy userId từ tham số đường dẫn
  const url = `http://127.0.0.1:8080/recommendation`; // URL của API Flask

  try {
    // Gửi yêu cầu GET tới API Flask với user_id
    const response = await axios.get(url, {
      params: {
        user_id: userId
      }
    });
    const recommendation = response.data.recommendations || []; // Đảm bảo recommendation là một mảng
    console.log(response.data.evaluation);
    // Lấy danh sách id sản phẩm
    const productIds = recommendation.map((item) => item.productid);

    // Kiểm tra nếu danh sách ID sản phẩm trống
    if (productIds.length === 0) {
      return res.status(200).json([]); // Trả về mảng rỗng nếu không có sản phẩm nào
    }

    // Lấy thông tin sản phẩm cùng với thông tin từ bảng farm
    const query = `
      SELECT 
        p.*, 
        f.farmname, 
        f.farmprovince 
      FROM 
        product p
      JOIN 
        farm f 
      ON 
        p.farmid = f.farmid
      WHERE 
        p.productid IN (${productIds.map(id => `'${id}'`).join(",")}) 
        AND p.isvisibleweb = true
    `;
    const productsWithFarm = await pool.query(query);

    // Trả về kết quả
    res.status(200).json(productsWithFarm.rows);

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getRecommendation };