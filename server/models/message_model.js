const mongoose = require("mongoose");
const User = require("./user_model");
const Room = require("./room_model");
// extra imports to dive deeper into data through other models

// how data will be stored on mongoose

const MessageSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      required: true,
      // required:true makes it so everything is needed to make an account
      ref: User, // references user_model for other things like firstName or lastName
    },
    room_id: {
      type: mongoose.ObjectId,
      required: false,
      ref: Room, // references room_model for other things like title or description of the room
    },
    text: {
      type: String,
      required: true,
      minLength: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", MessageSchema);

//export to mongoose
