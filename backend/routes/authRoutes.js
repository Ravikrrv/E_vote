// routes/authRoutes.js
const express = require('express');
const { register, login,getAllUsers,logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register',register);
router.post('/login', login);
router.get('/users',getAllUsers);

//router.post('/logout',logout);

module.exports = router;
