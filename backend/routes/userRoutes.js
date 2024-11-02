const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const uploadFile = require('../middlewares/uploadFile');
const { registerValidations, loginValidations } = require('../middlewares/validations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/register', guestMiddleware, usersController.registerForm);
router.post('/register', uploadFile.single('avatar'), registerValidations, userController.register);
router.get('/login', guestMiddleware, usersController.loginForm);
router.post('/login', loginValidations, userController.login);
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout);
router.post('/profile', authMiddleware, usersController.updateProfile);

module.exports = router;