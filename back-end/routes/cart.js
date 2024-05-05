const router = require("express").Router();
const cartController = require('../controllers/cartController');
router.post('/add-cart', cartController.addToCart);

module.exports = router;