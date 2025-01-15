const express = require("express");
const dotenv = require("dotenv");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});
