const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farmController');

router.get('/farm', farmController.getFarms);
router.get('/farm/:id', farmController.getFarmById);
router.get('/farm/product/:productid', farmController.getFarmByProductId);


module.exports = router;