const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");

router.get(
  "/recommendation/:userId",
  recommendationController.getRecommendation
);

module.exports = router;
