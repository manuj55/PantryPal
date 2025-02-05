const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const publicKeyRoute = require("./routes/auth/publicKeyRoute");
const loginRoute = require("./routes/auth/loginRoute");
const { correlationIdMiddleware } = require("./correlationId");
const rateLimit = require('express-rate-limit');

dotenv.config();

// configure rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Initialize express app
const app = express();

app.use(cors());
app.use(correlationIdMiddleware);
// Middleware
app.use(express.json());

// Public Key
app.use("/.well-known/jwks.json", publicKeyRoute);

// Routes
app.use("/api/login", loginRoute);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});
