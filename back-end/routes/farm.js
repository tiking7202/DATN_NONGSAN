const express = require("express");
const router = express.Router();
const farmController = require("../controllers/farmController");
const authenticateToken = require("../middlewares/authMiddlewares");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get("/farm", farmController.getFarms);
router.get("/farm/:id", farmController.getFarmById);
router.get("/farm/product/:productid", farmController.getFarmByProductId);
router.get("/farm/info/:id", farmController.getFarmById);
router.get("/farm/user/:userid", farmController.getFarmByUserId);

router.put("/farm/change-info", farmController.changeInfoFarm);
router.put(
  "/farms/updatelogo/:farmid",
  farmController.upload.single("farmlogo"),
  farmController.updateLogoFarm
);
router.put(
  "/farms/updateimage/:farmid",
  farmController.upload.fields([
    { name: "farmimage", maxCount: 1 },
    { name: "farmimage1", maxCount: 1 },
    { name: "farmimage2", maxCount: 1 },
    { name: "farmimage3", maxCount: 1 },
  ]),
  farmController.updateImageFarm
);
module.exports = router;
