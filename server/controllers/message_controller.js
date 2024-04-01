//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing our Message Table
const Message = require("../models/message_model");

// //? Importing our Room Table
const Room = require("../models/room_model");

//? Import Validate Session
const validateSession = require("../middleware/validate-session");

//? delete message in a room with room id
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(req.user);
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    const allResults = await Message.find().populate("user_id", [
      "firstName",
      "lastName",
    ]);

    console.log(message);
    console.log(allResults);

    if (!message) throw new Error("Message not found");

    res.status(200).json({
      Deleted: message,
      Results: allResults,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//? create new message in a room

router.post("/create/:room_id", async (req, res) => {
  try {
    const userIdFromToken = req.user.id;
    console.log(req.user);

    console.log("THIS IS VERIFICATION", req.body.text);

    let message = new Message({
      text: req.body.text,
      user_id: userIdFromToken,
      room_id: req.params.room_id,
    });

    const newMessage = await message.save();

    console.log(message, newMessage);

    res.status(200).json({
      Created: newMessage,
      userName: req.user.firstName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: "Unauthorized",
    });
  }
});

//? get all messages within a room
router.get("/all/:room_id", async (req, res) => {
  try {
    let results = await Message.find({ room_id: req.params.room_id })
      .populate("user_id", ["firstName", "lastName"]) // Populate user details
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
        user_id: 1,
      });
    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

//? update a message with room id
router.patch("/update/:id", async (req, res) => {
  try {
    let newInfo = req.body;

    let result = await Message.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      newInfo,
      {
        new: true,
      }
    );

    res.status(200).json({
      Updated: result,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
