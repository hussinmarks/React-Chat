//? Import controllers
const userController = require("./user_controller");
const roomController = require("./room_controller");
const messageController = require("./message_controller");

//? Export controllers
module.exports = { userController, messageController, roomController };

// shortcut to export all in one file
