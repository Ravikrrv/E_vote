const Vote = require('../models/Vote');
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const Election = require('../models/Election');

// Function to cast a vote
exports.castVote = async (req, res) => {
    const { candidateId, userId,electionId ,votedAt} = req.body;

    // Check if candidateId and electionId are provided
    if (!candidateId || !electionId) {
        return res.status(400).json({ error: 'Candidate ID and Election ID are required' });
    }

    try {
        // Find the logged-in user
        // const user = await User.findById(req.user.id);

        // // Check if the user exists
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        // Check if the election exists
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        // Check if the candidate exists
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Create a new vote
        const vote = new Vote({
            userId: userId,
            electionId: election._id,
            candidateId: candidate._id,
            date:votedAt
        });

        // Save the vote
        await vote.save();

        res.status(201).json({ message: 'Vote cast successfully' });
    } catch (err) {
        console.error('Error casting vote:', err);
        res.status(500).json({ error: err.message });
    }
};


// Function to get all votes with user, candidate, and election details
exports.getVotes = async (req, res) => {
    try {
        // Populate votes with user, candidate, and election details
        const votes = await Vote.find()
            .populate('userId', 'name') // Assuming User model has a 'name' field
            .populate('electionId', 'electionType') // Assuming Election model has an 'electionType' field
            .populate('candidateId', 'name partyName'); // Assuming Candidate model has 'name' and 'partyName' fields

        res.json(votes);
    } catch (err) {
        console.error('Error fetching votes:', err);
        res.status(500).json({ error: err.message });
    }
};
