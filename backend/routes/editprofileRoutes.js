// routes/editProfileRoutes.js
const express = require('express');
const router = express.Router();
const { editProfile } = require('../controllers/editprofileController');
const {authenticateToken,authorizeUser} = require('../middleware/authMiddleware'); // Ensure this middleware is defined to authenticate the user

router.put('/edit-profile', authenticateToken,authorizeUser, editProfile);

module.exports = router;
