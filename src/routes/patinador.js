const express = require('express');

const PatinadorController = require('../controllers/PatinadorController');
const router = express.Router();

router.get('/newEntreneDanza', PatinadorController.goToEntreneForm);
router.post('/newEntreneDanza', PatinadorController.createEntreneDanza);

router.get('/newEntreneLibre', PatinadorController.goToEntreneLibre);
router.post('/newEntreneLibre', PatinadorController.createEntreneLibre);

router.get('/informe', PatinadorController.getInforme);

module.exports = router;