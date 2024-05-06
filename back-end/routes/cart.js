const router = require("express").Router();
const cartController = require('../controllers/cartController');

router.post('/add-cart', cartController.addToCart);
router.post('/cart', cartController.getAllCart);
router.delete('/delete-cart/:userId/:productId', cartController.removeFromCart);

module.exports = router;