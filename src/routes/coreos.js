const express = require('express');

const CoreografiasController = require('../controllers/CoreografiasController');
const router = express.Router();

router.get('/discoLibreForm', CoreografiasController.goToDiscoLibreForm);
router.get('/addElements', CoreografiasController.goToaddElementInForm);
router.post('/discoLibreForm', CoreografiasController.addElement);

module.exports = router;