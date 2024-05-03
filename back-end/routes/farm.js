const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farmController');

router.get('/farm', farmController.getFarms);
router.get('/farm/:id', farmController.getFarmById);

module.exports = router;