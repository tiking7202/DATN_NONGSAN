const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/checkout", checkoutController.addCheckOut);
router.get("/shipping-info/:id", checkoutController.getShippingInfo);
router.get("/purchase-history/:userId", checkoutController.getPurchaseHistory);
router.get("/order/:orderId", checkoutController.getOrderItemById);
module.exports = router;
