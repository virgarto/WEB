const express = require('express');

const EntrenadorController = require('../controllers/EntrenadorController');
const router = express.Router();

router.get('/informeEntrenador', EntrenadorController.goToInforme);

router.get('/informe1', EntrenadorController.getInformeEntrenador);

module.exports = router;