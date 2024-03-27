const express = require('express');

const EntrenadorController = require('../controllers/EntrenadorList');
const router = express.Router();

router.get('/entrenamientosList', EntrenadorController.listPatinadores);

module.exports = router;