const router = require("express").Router();
const authController = require('../controllers/authController');
const authenticateToken = require("../middlewares/authMiddlewares");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post('/register/step1', authController.registerStep1);

router.post('/register/step2/:userId', authController.registerStep2);

router.post('/login', authController.login);

router.post('/refresh-token', authController.refreshToken);

router.get('/logout', authController.logout);

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
