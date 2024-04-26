const router = require("express").Router();
const authController = require('../controllers/authController');
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post('/register/step1', authController.registerStep1);

router.put('/register/step2/:userId', authController.registerStep2);

router.post('/login', authController.login);

router.get('/protected', authMiddlewares, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

router.get('/logout', authController.logout);

module.exports = router;
