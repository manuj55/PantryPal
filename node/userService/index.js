const express = require('express');
const dontenv = require('dotenv');
const cors = require("cors");

//connect to the database
const connectDB = require("./config/db.js")
const userRoute = require("./routes/userRoute")
const swaggerDocs = require('./swagger.js')


dontenv.config();



//initialize the app
const app = express();

//middleware
//parse incoming request to json
app.use(express.json());


app.use("/api/users", userRoute)

const PORT = process.env.PORT;

// Enable CORS for Vue frontend (port 8080)
app.use(cors({
    origin: "http://localhost:8080",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.listen(PORT, () => {
    console.log(`userService Server is running on port ${PORT}`);
    connectDB();
    swaggerDocs(app, PORT);
})