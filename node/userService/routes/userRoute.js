const express = require("express");
const User = require("../models/user")
const router = express.Router();

//create user 
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please provide all fields" })
    }

    try {
        const exisitingUser = await User.findOne({ email })
        if (exisitingUser) {
            return res.status(400).json({ msg: "User already exists" })
        }

        //Create a new user 
        const newUser = new User({
            name,
            email,
            password
        })

        const savedUSer = await newUser.save();
        res.status(201).json(savedUSer);
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }

})


module.exports = router;