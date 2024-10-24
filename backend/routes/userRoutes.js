
const express = require('express');
const router = express.Router();
// const { getUsersByStation, createUser } = require('../controllers/userController');
const {getUsers, getTotalUsers, activeUsers, addUser, deleteUser, getUsersfromMobile, getUserStatus } = require('../controllers/userController');

// // Existing routes
// router.get('/users/:area', getUsersByStation);

// // New route for creating users
// router.post('/users', createUser);
router.get("/api/user-status/:phoneNumber", getUserStatus);
router.get("/api/users", getUsers);
router.get("/api/total-users", getTotalUsers);
router.get("/api/active-users", activeUsers);
router.post("/api/users", addUser);
router.delete("/api/users", deleteUser);
router.get("/api/users/mobile-numbers", getUsersfromMobile);

module.exports = router;