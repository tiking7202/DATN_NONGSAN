const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/checkout", checkoutController.addCheckOut);
router.get("/shipping-info/:id", checkoutController.getShippingInfo);
router.get("/purchase-history/:userId", checkoutController.getPurchaseHistory);
router.get("/order/:orderId", checkoutController.getOrderItemById);
router.get("/farmer/orders/:farmerId", checkoutController.getAllOrdersByFarmer);
router.get("/farmer/order/:orderId", checkoutController.getOrderDetailFarmer);
router.put("/farmer/order-update", checkoutController.updateStatusOrder);

router.post(
  "/checkout/create-payment-session",
  checkoutController.createPaymentSession
);
router.get(
  "/checkout/confirm-payment/:sessionId",
  checkoutController.confirmPaymentSession
);
router.post("/checkout/save-payment", checkoutController.savePaymentToDB);

router.get("/distributor/orders", checkoutController.getAllOrderToDistributor);

module.exports = router;
