const axios = require("axios");
const pool = require("../config/dbConnect");
const FormData = require("form-data"); // Thêm form-data thư viện
const fs = require("fs");

// Function to search for product info by image
const searchByImage = async (req, res) => {
    try {
    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("image", req.file.buffer, req.file.originalname); // Đính kèm file ảnh

    // Gửi request đến Flask API
    const flaskApiUrl = "http://192.168.2.6:12000/search-image";
    const flaskResponse = await axios.post(flaskApiUrl, formData, {
        headers: {
            ...formData.getHeaders(), // Lấy headers từ form-data
        },
    });

    // Lấy danh sách product_id từ response của Flask API
    const productIds = flaskResponse.data.product_ids;

    // Truy vấn PostgreSQL để lấy thông tin sản phẩm dựa trên product_id
    const productQuery = `
                SELECT 
                    p.*, 
                    f.farmname, 
                    f.farmprovince, 
                    c.categoryname,
                    pb.*
                FROM 
                    product p
                LEFT JOIN 
                    farm f 
                ON 
                    p.farmid = f.farmid
                LEFT JOIN 
                    category c 
                ON 
                    p.categoryid = c.categoryid
                LEFT JOIN (
                    SELECT DISTINCT ON (productid) *
                    FROM product_batch
                    ORDER BY productid, batchid
                ) pb
                ON 
                    p.productid = pb.productid
                WHERE 
                    p.productid = ANY($1::uuid[])
            `;
    const result = await pool.query(productQuery, [productIds]);

    // Trả về thông tin sản phẩm
    res.json({
        products: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during image search" });
    }
};

module.exports = { searchByImage };
