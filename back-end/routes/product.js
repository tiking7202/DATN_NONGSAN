const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/product", productController.getProducts);
router.get("/category/:id/product", productController.getProductsByCategoryId);
router.get("/product/:id", productController.getProductById);
router.get("/search", productController.searchProduct);

router.get("/farm/productdetail/:id", productController.getProductsByFarmId);
// router.get("/farm/season/:id", productController.getProductsByFarmId);

// Cho farmer quản lý sản phẩm
router.get(
  "/farmer/products/:userid",
  productController.getAllProductsByFarmId
);
router.post(
  "/farmer/create/product",
  productController.upload.fields([
    { name: "productimage1", maxCount: 1 },
    { name: "productimage2", maxCount: 1 },
    { name: "productimage3", maxCount: 1 },
  ]),
  productController.createProduct
);
router.put(
  "/farmer/update/product/:productid",
  productController.upload.fields([
    { name: "productimage1", maxCount: 1 },
    { name: "productimage2", maxCount: 1 },
    { name: "productimage3", maxCount: 1 },
  ]),
  productController.updateProduct
);
router.delete(
  "/farmer/delete/product/:productid",
  productController.deleteProduct
);
router.post("/create/product-batch/:productid", productController.createProductBatch);
router.get("/product-batch/:productid", productController.getProductBatchByProductId);
router.put("/update/product-batch/:batchid", productController.updateProductBatch);
router.delete("/delete/product-batch/:batchid", productController.deleteProductBatch);
// Cho distributor quản lý sản phẩm
router.get(
  "/distributor/products",
  productController.getAllProductsToDistributor
);
router.patch(
  "/distributor/update/productquality/:productid",
  productController.updateProductQuality
);
router.patch(
  "/distributor/update/isvisibleweb/:productid",
  productController.updateProductVisibility
);
router.patch(
  "/distributor/update/productprice/:productid",
  productController.updateProductPrice
);
router.patch(
  "/distributor/update/promotion/:productid",
  productController.updateProductPromotion
);
router.get("/distributor/search", productController.searchProductsForDistributor);

module.exports = router;
