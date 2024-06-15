
const express = require('express');
const router = express.Router();
const { getUsersByStation, createUser } = require('../controllers/userController');

// Existing routes
router.get('/users/:area', getUsersByStation);

// New route for creating users
router.post('/users', createUser);

module.exports = router;