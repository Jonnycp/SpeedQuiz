const express = require("express");
const { isAuth } = require("../middleware/auth.middleware.js");
const GameController = require("../controllers/Game.controller.js")
const router = express.Router();

router.get("/", isAuth, GameController.getProfileStats);
router.get("/:id", isAuth, GameController.getGameLeaderboard);

module.exports = router;