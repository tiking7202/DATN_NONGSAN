const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/user/:id", userController.getUserById);
router.put("/user/change-password", userController.changePassword);
router.put("/user/change-info", userController.changeInfo);

module.exports = router;
