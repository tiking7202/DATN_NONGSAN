const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");

router.get("/farm/season/:id", cropController.getCropsByFarmId);

module.exports = router;
