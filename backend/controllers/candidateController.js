const Candidate = require('../models/Candidate');

exports.addCandidate = async (req, res) => {
    const { name, profilePicture, partyName, partySymbol } = req.body;
    try {
        const candidate = new Candidate({ name, profilePicture, partyName, partySymbol });
        await candidate.save();
        res.status(201).json({ message: 'Candidate added successfully', candidate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCandidate = async (req, res) => {
    const { id } = req.params;
    try {
        await Candidate.findByIdAndDelete(id);
        res.json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
