//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing our Room Table
const Room = require("../models/room_model");

//? Import Validate Session
const validateSession = require("../middleware/validate-session");

//? create new rooms

router.post("/create/", validateSession, async (req, res) => {
  try {
    const userIdFromToken = req.user.id;


    let createRoom = new Room({
      title: req.body.title,
      description: req.body.description,
      user_id: userIdFromToken,
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

module.exports = router;
