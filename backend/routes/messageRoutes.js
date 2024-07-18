// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { saveMessage } = require('../controllers/messageController');

router.post('/send', saveMessage);

module.exports = router;
