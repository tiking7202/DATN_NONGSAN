const router = require("express").Router();
const authController = require('../controllers/authController');

router.post('/register/step1', authController.registerStep1);

router.put('/register/step2/:userId', authController.registerStep2);

module.exports = router;
