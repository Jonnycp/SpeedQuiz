const express = require("express");
const { isAuth } = require("../middleware/auth.middleware.js");
const GameController = require("../controllers/Game.controller.js")
const router = express.Router();

router.get("/profile-stats", isAuth, GameController.getProfileStats);

module.exports = router;