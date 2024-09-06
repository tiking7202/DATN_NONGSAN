const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategoryById);


module.exports = router;