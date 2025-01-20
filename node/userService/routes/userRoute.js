const express = require("express");
const User = require("../models/user")
const router = express.Router();


/**
         * POST Methods
         * @openapi
         * '/api/user/register':
         *  post:
         *     tags:
         *     - User Controller
         *     summary: Create a user
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - email
         *               - password
         *             properties:
         *               name:
         *                 type: string
         *                 default: johndoe
         *               email:
         *                 type: string
         *                 default: johndoe@mail.com
         *               password:
         *                 type: string
         *                 default: johnDoe20!@
         *     responses:
         *       201:
         *         description: Created
         *       409:
         *         description: Conflict
         *       404:
         *         description: Not Found
         *       500:
         *         description: Server Error
         */
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


/**
 * GET User
 * @openapi
 * '/api/users':
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
//get user 
router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
})

/**
 * GET user by id
 * @openapi
 * '/api/users/{id}':
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

//get user by id
router.get("/:id", async (req, res) => {
    try {
        const userByID = await User.findById(req.params.id);
        res.status(200).json(userByID);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router;