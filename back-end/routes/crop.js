const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");

router.get("/farm/season/:id", cropController.getCropsByFarmId);

router.post("/farm/create/crop", cropController.createCrop);
router.delete("/farmer/delete/crop/:cropid", cropController.deleteCrop);
router.put("/farmer/update/crop/:cropid", cropController.updateCrop);
router.get("/farmer/crops/:userid", cropController.getAllCropsByFarmId);
router.get("/crop/:cropid", cropController.getCropById);

module.exports = router;
