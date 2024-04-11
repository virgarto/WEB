const express = require('express');

const CoreografiasController = require('../controllers/CoreografiasController');
const router = express.Router();

router.get('/discoCortoForm', CoreografiasController.goToDiscoCortoForm);

module.exports = router;