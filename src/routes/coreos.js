const express = require('express');

const CoreografiasController = require('../controllers/CoreografiasController');
const router = express.Router();

router.get('/discoLibre', CoreografiasController.goToDiscoLibreForm);
router.get('/addElementLibre', CoreografiasController.goToaddElementLibre);
router.post('/discoLibre', CoreografiasController.addElementLibre);

router.get('/discoDanzaFree', CoreografiasController.goTodiscoDanzaFreeForm); 
router.get('/addElementDanza', CoreografiasController.goToaddElementDanza);
router.post('/discoDanzaFree', CoreografiasController.addElementDanzaFree);

router.get('/discoDanzaStyle', CoreografiasController.goTodiscoDanzaStyleForm); 
router.post('/discoDanzaStyle', CoreografiasController.addElementDanzaStyle);

module.exports = router;