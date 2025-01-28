const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const publicKeyRoute = require("./routes/auth/publicKeyRoute");
const loginRoute = require("./routes/auth/loginRoute");

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Public Key
app.use("/.well-known/jwks.json", publicKeyRoute);

// Routes
app.use("/api/login", loginRoute);

app.use(cors({
  origin: "http://localhost:8080",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});
