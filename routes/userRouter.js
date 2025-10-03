const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/profile', userController.getProfile);

module.exports = router;

