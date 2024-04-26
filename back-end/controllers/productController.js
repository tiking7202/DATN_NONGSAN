const pool = require('../config/dbConnect');

// lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM product');
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Lấy sản phẩm có trong category
exports.getProductsByCategoryId = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await pool.query('SELECT * FROM product WHERE categoryid = $1', [id]);
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Lấy sản phẩm theo id
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await pool.query('SELECT * FROM product WHERE productid = $1', [id]);
        res.json(product.rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createProduct = async (req, res) => {
    const { name, price, categoryId } = req.body;
    try {
        const newProduct = await pool.query('INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *', [name, price, categoryId]);
        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    try {
        const updatedProduct = await pool.query('UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *', [name, price, categoryId, id]);
        res.json(updatedProduct.rows[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
