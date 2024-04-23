const router = require("express").Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");

router.use("/auth", auth);
router.use("", category);
router.use("", product);

module.exports = router;
