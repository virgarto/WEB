const express = require('express');

const EntrenadorController = require('../controllers/EntrenadorController');
const router = express.Router();

router.get('/informeEntrenador', EntrenadorController.goToInforme);

module.exports = router;