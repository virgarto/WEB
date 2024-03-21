const express = require('express');

const EntreneController = require('../controllers/EntreneController');
const router = express.Router();

router.get('/newEntreneDanza', EntreneController.goToEntreneForm);
router.post('/newEntreneDanza', EntreneController.createEntreneDanza);
router.get('/newEntreneLibre', EntreneController.goToEntreneLibre);
router.post('/newEntreneLibre', EntreneController.createEntreneLibre);

router.get('/entrenamientos', EntreneController.getInforme);

module.exports = router;