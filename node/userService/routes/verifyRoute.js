const express = require('express');
const router = express.Router();
const User = require('../models/user');
const VerificationToken = require('../models/VerificationToken');

router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the verification token in the DB
        const tokenRecord = await VerificationToken.findOne({ token });
        if (!tokenRecord) {
            return res.status(400).json({ message: 'Invalid or expired verification token.' });
        }

        // Find the user and update isVerified flag
        const user = await User.findById(tokenRecord.userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        user.isVerified = true;
        await user.save();

        // Delete the token now that it's been used
        await VerificationToken.findByIdAndDelete(tokenRecord._id);

        res.status(200).json({ message: 'User verified successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;