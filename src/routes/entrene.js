const express = require('express');

const EntreneController = require('../controllers/EntreneController');
const router = express.Router();

router.get('/newEntrene', EntreneController.goToEntreneForm);

module.exports = router;