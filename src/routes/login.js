const express = require('express');

const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.get('/login', LoginController.login);
router.get('/signUp', LoginController.signUp);

router.post('/signUp', LoginController.storeUser);

module.exports = router;
