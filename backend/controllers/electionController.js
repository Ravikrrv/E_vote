const Election = require('../models/Election');

// Get all upcoming elections
exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new election
exports.addElection = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newElection = new Election({ name, description });
    await newElection.save();
    res.status(201).json(newElection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add delete election functionality
exports.deleteElection = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Election.findByIdAndDelete(id);
      res.status(200).json({ message: 'Election deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
