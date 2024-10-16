const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");
const category = require("./category");
const product = require("./product");
const farm = require("./farm");
const cart = require("./cart");
const checkout = require("./checkout");
const review = require("./review");
const crop = require("./crop");
const recommendation = require("./recommendation");
const searchImg = require("./searchImg");

router.use("/auth", auth);
router.use("", user);
router.use("", category);
router.use("", product);
router.use("", farm);
router.use("", cart);
router.use("", checkout);
router.use("", review);
router.use("", crop);
router.use("", recommendation);
router.use("", searchImg);

module.exports = router;
