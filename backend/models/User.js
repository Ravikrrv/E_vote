// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'admin'], required: true },
    adminPasskey: { type: String, required: function() { return this.role === 'admin'; } },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    adhar: { type: Number, required: true,unique:true },
    voterId: { type: String, required: true,unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Pre-save hook to handle validation logic
UserSchema.pre('save', function(next) {
    if (this.role === 'admin' && !this.adminPasskey) {
        return next(new Error('Admin passkey is required for admin role'));
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
