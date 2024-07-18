const express = require('express');
const { addCandidate, deleteCandidate, getCandidates } = require('../controllers/candidateController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, authorizeAdmin, addCandidate);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteCandidate);
router.get('/', authenticateToken, getCandidates);

module.exports = router;
