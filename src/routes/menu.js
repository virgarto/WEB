const express = require('express');

const menuController = require('../controllers/menuController');
const router = express.Router();

router.get('/home', menuController.home);
router.get('/perfil', menuController.perfil);
router.get('/entrenamientos', menuController.entrenamientos);

module.exports = router;