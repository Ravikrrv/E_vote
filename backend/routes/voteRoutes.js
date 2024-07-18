const express = require('express');
const router = express.Router();
const { castVote, getVotes } = require('../controllers/voteController');
const { authenticateToken, authorizeUser } = require('../middleware/authMiddleware');

// Route to cast a vote
router.post('/', authenticateToken, authorizeUser,castVote);

// Route to get all votes
router.get('/', authenticateToken, getVotes);

module.exports = router;
