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
router.get("/farmer/products/:userid", productController.getAllProductsByFarmId);
router.post("/farmer/create/product", productController.createProduct);
router.put("/farmer/update/product/:productid", productController.updateProduct);
router.delete("/farmer/delete/product/:productid", productController.deleteProduct);

module.exports = router;
