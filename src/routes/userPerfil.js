const express = require('express');

const userController = require('../controllers/userController');
const router = express.Router();

router.get('/editUserForm', userController.editUser);

module.exports = router;