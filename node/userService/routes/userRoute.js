const express = require("express");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const { userServiceLogger: logger } = require("../../logging");
const User = require("../models/user")
const VerificationToken = require('../models/VerificationToken');

const { verifyRole } = require("./auth/util");
const { ROLES } = require("../consts");

const router = express.Router();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});



// Optionally verify the transporter
transporter.verify((error) => {
    if (error) {
        logger.error(`Nodemailer transporter error: ${error}`);
    } else {
        logger.info('Server is ready to take our messages');
    }
});

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
    logger.info("POST /api/user/register called");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        logger.warn("Missing fields: name, email, or password");
        return res.status(400).json({ msg: "Please provide all fields" });
    }

    try {
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            logger.warn(`User already exists with email: ${email}`);
            return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        const savedUSer = await newUser.save();
        logger.info(`User created with ID: ${savedUSer._id}`);

        const token = uuidv4();
        const verificationToken = new VerificationToken({
            userId: savedUSer._id,
            token,
        });
        await verificationToken.save();

        const url = `http://localhost:5002/api/verify/${token}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: savedUSer.email,
            subject: 'Verify Your Email',
            html: `<p>Please click the following link to verify your email:</p>
                   <a href="${url}">${url}</a>`,
        };
        try {
            await transporter.sendMail(mailOptions);
            logger.info(`Verification email sent to: ${savedUSer.email}`);
        } catch (error) {
            logger.error(`Failed to send verification email: ${error.message}`);
            return res.status(500).json({ error: "Failed to send verification email" });
        }

        res.status(201).json(savedUSer);
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
});


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
router.get("/", verifyRole([ROLES.ADMIN, ROLES.AUTH_SERVICE]), async (req, res) => {
    logger.info("GET /api/users called");
    try {
        const user = await User.find();
        logger.info("Users retrieved successfully");
        res.status(200).json(user);
    } catch (error) {
        logger.error(`GET /api/users error: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * GET user by id
 * @openapi
 * '/api/users/{id}':
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetch a user from the database using its unique ID
 *     tags:
 *       - User Controller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
//get user by id
router.get("/:id", verifyRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
    logger.info(`GET /api/users/${req.params.id} called`);
    try {
        const userByID = await User.findById(req.params.id);
        if (!userByID) {
            logger.warn(`User not found with id: ${req.params.id}`);
            return res.status(404).json({ msg: "User not found" });
        }
        logger.info(`User with id ${req.params.id} retrieved successfully`);
        res.status(200).json(userByID);
    } catch (error) {
        logger.error(`GET /api/users/:id error: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Updates and returns the updated user data.
 *     tags:
 *      - User Controller
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 country:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id", async (req, res) => {
    logger.info(`PUT /api/users/${req.params.id} called`);
    try {
        const { email, password } = req.body;
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                logger.warn(`Email ${email} is already used by another user.`);
                return res.status(400).json({ msg: "Email is already used by other user" });
            }
        }
        if (password) {
            logger.warn("Attempted to change password");
            return res.status(400).json({ msg: "Password cannot be changed" });
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            logger.warn(`User not found with id: ${req.params.id}`);
            return res.status(404).json({ msg: "User not found" });
        }
        logger.info(`User with id ${req.params.id} updated successfully`);
        return res.status(200).json(updatedUser);
    } catch (error) {
        logger.error(`PUT /api/users/:id error: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Removes a user from the system by their unique ID.
 *     tags:
 *       - User Controller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", async (req, res) => {
    logger.info(`DELETE /api/users/${req.params.id} called`);
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            logger.warn(`User not found with id: ${req.params.id}`);
            return res.status(404).json({ msg: "User not found" });
        }
        logger.info(`User with id ${req.params.id} deleted successfully`);
        res.status(200).json(user);
    } catch (error) {
        logger.error(`DELETE /api/users/:id error: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;