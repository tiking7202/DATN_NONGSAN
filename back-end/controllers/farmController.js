const pool = require('../config/dbConnect');

// lay tat ca farm
exports.getFarms = async (req, res) => {
    try {
        const farms = await pool.query('SELECT * FROM farm');
        res.json(farms.rows);
    } catch (error) {
        console.error('Error fetching farms:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// lay farm theo id
exports.getFarmById = async (req, res) => {
    const { id } = req.params;
    try {
        const farm = await pool.query('SELECT * FROM farm WHERE farmid = $1', [id]);
        res.json(farm.rows[0]);
    } catch (error) {
        console.error('Error fetching farm:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};