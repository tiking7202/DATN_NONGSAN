const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/checkout", checkoutController.addCheckOut);
router.get("/shipping-info/:id", checkoutController.getShippingInfo);

module.exports = router;
