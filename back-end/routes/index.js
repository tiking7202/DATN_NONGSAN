const router = require("express").Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const farm = require("./farm");
const cart = require("./cart");

router.use("/auth", auth);
router.use("", category);
router.use("", product);
router.use("", farm);
router.use("", cart)

module.exports = router;
