//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing our Room Table
const Room = require("../models/room");

//? create new rooms
router.post("/create/:user_id", async (req, res) => {
  try {
    const userIdFromToken = req.user.id;

    if (userIdFromToken !== req.params.user_id) {
      throw new Error("Unauthorized user");
    }

    let createRoom = new Room({
      title: req.body.title,
      description: req.body.description,
      user_id: req.params.user_id,
    });

    const newRoom = await createRoom.save();

    res.status(200).json({
      Created: newRoom,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//? display all rooms
router.get("/", async (req, res) => {
  try {
    let results = await Room.find()
      .populate("user_id", ["firstName", "lastName"])
      .select({
        title: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
      });
    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//? get rooms
router.get("/roomById/:id", async (req, res) => {
  try {
    let results = await Room.find({ room_id: req.params.room_id })
      .populate("user_id", ["firstName", "lastName"])
      .select({
        title: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
      });
    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//? delete a room
router.delete("/delete/:id", async (req, res) => {
  try {
    const room = await room.findByIdAndDelete(req.params.id);
    const allResults = await room
      .find()
      .populate("room_id", ["title", "description"]);

    if (!room) throw new Error("room not found");

    res.status(200).json({
      Deleted: room,
      Results: allResults,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

//? update a room
router.patch("/update/:id", async (req, res) => {
  try {
    let newInfo = req.body;

    let result = await Message.findByIdAndUpdate(req.params.id, newInfo, {
      new: true,
    });

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
