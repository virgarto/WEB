const express = require('express');

const CoreografiasController = require('../controllers/CoreografiasController');
const router = express.Router();

router.get('/discoCortoForm', CoreografiasController.goToDiscoCortoForm);
router.get('/addElements', CoreografiasController.goToaddElementInForm);
router.post('/discoCortoForm', CoreografiasController.addElement);
router.get('/discoLargoForm', CoreografiasController.goToDiscoLargoForm);
router.post('/discoLargoForm', CoreografiasController.addElement);

module.exports = router;