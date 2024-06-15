dutyRoutes.js
const express = require('express');
const router = express.Router();
const { dutyAssign } = require('../controllers/dutyController');
const { getUsersByStation } = require('../controllers/userController');

router.get('/users/:area', getUsersByStation);
router.post('/assign', dutyAssign);

module.exports = router;