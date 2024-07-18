// controllers/messageController.js
const Message = require('../models/Message');

exports.saveMessage = async (req, res) => {
    const { username, email, message } = req.body;

    try {
        const newMessage = new Message({
            username,
            email,
            message
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message received successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
