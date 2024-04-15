const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/avatar'); // Thư mục lưu trữ avatar
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Tên file mới
    }
});

const uploadAvatar = multer({ storage: storage }).single('avatar');

module.exports = {
    uploadAvatar,
};
