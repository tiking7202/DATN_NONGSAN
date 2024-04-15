const pool = require('../config/dbConnect');
const avatarService = require('../services/avatarService');
const registerStep1 = async (req, res) => {
    try {
        const { username, password, email, fullname, phonenumber, role, status } = req.body;
        // Lưu thông tin cơ bản vào cơ sở dữ liệu
        const newUser = await pool.query(
            'INSERT INTO "User" (username, password, email, fullname, phonenumber, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [username, password, email, fullname, phonenumber, role, status]
        );

        res.json(newUser.rows[0]);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }
};

const registerStep2 = async (req, res) => {
    try {
        // Lưu trữ avatar vào thư mục và cập nhật đường dẫn vào cơ sở dữ liệu
        avatarService.uploadAvatar(req, res, async (err) => {
            if (err) {
                console.error('Error uploading avatar:', err);
                return res.status(500).send('Internal Server Error');
            }
            const { userId } = req.params;
            const { address, identityCard } = req.body;
            if (!address) {
                return res.status(400).send('Địa chỉ không được gửi.');
            }
            const { street, commune, district, province } = address;
            if (!street || !commune || !district || !province) {
                return res.status(400).send('Địa chỉ không đầy đủ.');
            }
            // const avatarPath = req.file.path; // Đường dẫn tới file avatar
            const avatarPath = null;
            const updatedUser = await pool.query(
                'UPDATE "User" SET street = $1, commune = $2, district = $3, province = $4, indentitycard = $5, avatar = $6 WHERE userid = $7 RETURNING *',
                [street, commune, district, province, identityCard, avatarPath, userId]
            );

            res.json(updatedUser.rows[0]);
        });
    } catch (error) {
        console.error('Error updating additional info:', error);
        res.status(500).send('Internal Server Error');
    }
}; 

module.exports = {
    registerStep1,
    registerStep2,
};
