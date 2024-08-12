const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/product", productController.getProducts);
router.get("/category/:id/product", productController.getProductsByCategoryId);
router.get("/product/:id", productController.getProductById);
router.get("/search", productController.searchProduct);

router.get("/farm/productdetail/:id", productController.getProductsByFarmId);
router.get("/farm/season/:id", productController.getProductsByFarmId);

// Cho farmer quản lý sản phẩm
router.get("/farmer/products/:userid", productController.getProductsByFarmId);

module.exports = router;
