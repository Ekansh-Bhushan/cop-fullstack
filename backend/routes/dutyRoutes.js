const express = require("express");
const router = express();
const { dutyAssign, usersForTask } = require('../controllers/dutyController');
// const { getUsersByStation } = require('../controllers/userController');

// router.get('/users/:area', getUsersByStation);
router.post('/api/assignDuty', dutyAssign);
router.get('/api/usersForTask', usersForTask);

module.exports = router;