const express = require('express');

const CoreografiasController = require('../controllers/CoreografiasController');
const router = express.Router();

router.get('/discoLibre', CoreografiasController.goToDiscoLibreForm);
router.get('/addElementLibre', CoreografiasController.goToaddElementLibre);
router.post('/discoLibre', CoreografiasController.addElementLibre);

router.get('/discoDanza', CoreografiasController.goToDiscoDanzaForm); 
router.get('/addElementDanza', CoreografiasController.goToaddElementDanza);

module.exports = router;