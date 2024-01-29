const express = require('express');

const userController = require('../controllers/perfilController');
const router = express.Router();

router.get('/editUserForm', userController.editUser);
router.post('/editUserForm', userController.editPatinador);

module.exports = router;