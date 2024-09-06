const pool = require('../config/dbConnect');

// Đã dùng để gọi tất cả các category trên trang chủ
exports.getCategories = async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM category');
        res.json(categories.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await pool.query('SELECT * FROM category WHERE categoryid = $1', [id]);
        res.json(category.rows[0]);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
