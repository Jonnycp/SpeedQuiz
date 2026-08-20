const express = require("express");
const { isAuth } = require("../middleware/auth.middleware.js");
const GameController = require("../controllers/Game.controller.js")
const router = express.Router();

router.get("/profile-stats", isAuth, GameController.getProfileStats);
router.get("/leaderboard/:id", isAuth, GameController.getGameLeaderboard);

module.exports = router;