const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { logUserAction } = require('../logger');

// Assume ADMIN_PASSKEY is fetched from environment variable
const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'adminPssKey123';

exports.register = async (req, res) => {
    const { role, adminPasskey, name, dob, adhar, voterId, email, password } = req.body;
    try {
        let newUser;

        if (role === 'admin' && adminPasskey !== ADMIN_PASSKEY) {
            return res.status(400).json({ error: 'Invalid admin passkey' });
        }

        if (role === 'admin') {
            newUser = new User({ role, adminPasskey, name, dob, adhar, voterId, email, password });
        } else {
            newUser = new User({ role, name, dob, adhar, voterId, email, password });
        }

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        const payload = {
            user: { id: newUser.id, role: newUser.role }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        await logUserAction(newUser._id, 'register');

        res.status(201).json({ message: 'User registered successfully', token ,_id:newUser._id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { role, adminPasskey, email, password, adhar, voterId } = req.body;
    try {
        const user = await User.findOne({ email, adhar, voterId });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ error: 'Invalid role' });
        }
        if (role === 'admin' && adminPasskey !== ADMIN_PASSKEY) {
            return res.status(400).json({ error: 'Invalid admin passkey' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = {
            user: { id: user.id, role: user.role }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
       
        await logUserAction(user._id, 'login');   
        res.status(201).json({message: 'User logged in  successfully', token,_id:user._id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.logoutUser = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         await logUserAction(userId, 'logout');
        
//         res.status(200).json({ message: 'User logged out successfully' });
//     } catch (error) {
//         console.error('Logout error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
