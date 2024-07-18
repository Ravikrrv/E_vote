// models/Candidate.js
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilePicture: { type: String, required: true },
    partyName: { type: String, required: true },
    partySymbol: { type: String, required: true },
});

module.exports = mongoose.model('Candidate', CandidateSchema);
