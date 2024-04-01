//? Import from the mongoose library
const mongoose = require("mongoose");

// how data will be stored on mongoose

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    // required:true makes it so everything is needed to make an account
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);

//export to mongoose
