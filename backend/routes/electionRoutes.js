const express = require('express');
const router = express.Router();
const { getElections, addElection, deleteElection } = require('../controllers/electionController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

// Route to get upcoming elections
router.get('/',authenticateToken, getElections);

// Route to add a new election
router.post('/', authenticateToken,authorizeAdmin, addElection);

// Route to delete an election
router.delete('/:id',authenticateToken, authorizeAdmin,deleteElection);

module.exports = router;
