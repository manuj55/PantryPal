const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { authServiceLogger: logger } = require("../../../logging");
const { generateJWTWithPrivateKey, fetchUsers } = require("./util");
const { ROLES } = require("../../consts");

const router = express.Router();

dotenv.config();

router.post("/user", async (req, res) => {
    logger.info("POST /user login request received");
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            logger.warn("Email or password missing in request body");
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const users = await fetchUsers();
        logger.info("Fetched users for login");
        const user = users.find((s) => s.email === email);

        if (!user) {
            logger.warn(`User not found for email: ${email}`);
            return res.status(404).json({ message: "user not found" });
        }
        if (!user.isVerified) {
            logger.warn("User not verified");
            return res.status(400).json({ message: "User not verified" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn("Invalid credentials provided");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            roles: [ROLES.USER],
        };
        logger.info("Credentials valid, generating token");
        const token = generateJWTWithPrivateKey(payload);
        logger.info("Token generated successfully");

        res.status(200).json({
            access_token: token,
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        logger.error(`Server error during login: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
