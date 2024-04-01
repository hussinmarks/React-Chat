//? Importing dotenv, and applying it (giving us access to process.env)
require("dotenv").config();

//? Importing Express
const express = require("express");

//? Importing Mongoose
const mongoose = require("mongoose");

//? Connection string URL variable from .env file
const MONGODB = process.env.MONGO_DB_URL + process.env.DB_NAME;

//? Assign Express
const app = express();

//? cors
const cors = require("cors");

//? Import controller/s
const {
  userController,
  messageController,
  roomController,
} = require("./controllers/index");

//? Import validation middleware
const validateSession = require("./middleware/validate-session");

//? Connection middleware, connecting to DB
mongoose.connect(MONGODB);

//? Storing the connection status
const db = mongoose.connection;

//? Assigning a variable from .env, with fallback port of 8080
//* || - OR/DEFAULT operator
const PORT = process.env.PORT || 8080;

//? Middleware to allow JSON to be accepted by our HTTP server
app.use(express.json());

//? importing cors to use backend on browser
app.use(cors());

//? Allow parsing of query strings
app.use(express.urlencoded({ extended: true }));

//? Using the controllers
app.use("/user", userController);
app.use(validateSession);
app.use("/room", roomController);
app.use("/message", messageController);

//? Initial spin up of the Express server
app.listen(PORT, () => {
  try {
    //* Repeats string x int argument
    console.log("*".repeat(10));
    console.log(`Server is connected: ${PORT}`);
  } catch (err) {
    console.log("Error connecting", err);
  }
});