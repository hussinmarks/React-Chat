const mongoose = require("mongoose");
const User = require("./user_model");

// how data will be stored on mongoose

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // required:true makes it so everything is needed to make an account
      minLength: 1,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
    },
    user_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: User, // references user_model for other things like firstName or lastName
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("room", RoomSchema);

//export to mongoose
