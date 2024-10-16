const express = require('express');
const multer = require('multer');  // Middleware for handling file uploads
const { searchByImage } = require('../controllers/searchImgController');

const upload = multer();  
const router = express.Router();

// Route tìm kiếm bằng hình ảnh
router.post('/search-image', upload.single('image'), searchByImage);

module.exports = router;
