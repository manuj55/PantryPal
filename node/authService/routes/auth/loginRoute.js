const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const {
    generateJWTWithPrivateKey,
    fetchUsers,
} = require("./util");
const { ROLES } = require("../../../consts");
const { access } = require("fs");

const router = express.Router();

dotenv.config();

// user Login
router.post("/user", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        //fetch users
        const users = await fetchUsers();
        const user = users.find((s) => s.email === email);

        //user not found
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //create jwt
        const payload = {
            id: user._id,
            roles: [ROLES.USER],
        };
        const token = generateJWTWithPrivateKey(payload);
        res.status(200).json({ access_token: token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
