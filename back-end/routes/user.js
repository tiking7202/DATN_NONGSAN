const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/user/:id", userController.getUserById);

module.exports = router;