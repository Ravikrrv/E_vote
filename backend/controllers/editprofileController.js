const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.editProfile = async (req, res) => {
    const { name, dob, email, voterId, oldPassword, newPassword, confirmNewPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If user wants to change the password, validate old password and new passwords
        if (oldPassword || newPassword || confirmNewPassword) {
            // Validate old password
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Incorrect old password' });
            }

            // Validate new passwords match
            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ error: 'New passwords do not match' });
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // Update other profile details
        user.name = name;
        user.dob = dob;
        user.email = email;
        user.voterId = voterId;

        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
