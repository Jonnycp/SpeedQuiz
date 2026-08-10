const express = require("express");
const LobbyController = require("../controllers/Lobby.controller.js");
const { isAuth } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/", isAuth, LobbyController.create);

module.exports = router;