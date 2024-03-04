const express = require('express');

const EntreneController = require('../controllers/EntreneController');
const router = express.Router();

router.get('/newEntreneDanza', EntreneController.goToEntreneForm);
router.post('/newEntreneDanza', EntreneController.createEntreneDanza);

module.exports = router;