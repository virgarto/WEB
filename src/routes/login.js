const express = require('express');

const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.get('/login', LoginController.login);
router.get('/signUp', LoginController.signUp);

router.post('/login', LoginController.auth);
router.post('/signUp', LoginController.anyadirUser);


module.exports = router;
