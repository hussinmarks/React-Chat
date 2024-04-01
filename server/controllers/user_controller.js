//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing our User Table
const User = require("../models/user_model");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//? signup for a new user
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const user = new User({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      //? Using bcrypt to hash the password
      password: bcrypt.hashSync(req.body.password, 12),
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });

    res.status(200).json({
      Mgs: "Success! User created!",
      User: newUser,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err.code === 11000 ? "Unable to signup" : err,
    });
  }
});

//? Logging in a user
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("User not found");

    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Invalid Details");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    console.log("user.js", token);

    res.status(200).json({
      Msg: "User Signed In!",
      User: user,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
