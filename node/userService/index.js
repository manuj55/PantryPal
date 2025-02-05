const express = require('express');
const dontenv = require('dotenv');
const cors = require("cors");

//connect to the database
const connectDB = require("./config/db.js")
const userRoute = require("./routes/userRoute")
const verifyRoute = require("./routes/verifyRoute.js")
const { correlationIdMiddleware } = require("./correlationId.js");
const rateLimit = require('express-rate-limit');
const swaggerDocs = require('./swagger.js')


dontenv.config();

// configure rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

//initialize the app
const app = express();

//middleware
app.use(cors());
app.use(correlationIdMiddleware);
app.use(limiter);
//parse incoming request to json
app.use(express.json());


app.use("/api/users", userRoute)
app.use("/api", verifyRoute)

const PORT = process.env.PORT;

// Enable CORS for Vue frontend (port 8080)


app.listen(PORT, () => {
    console.log(`userService Server is running on port ${PORT}`);
    connectDB();
    swaggerDocs(app, PORT);
})