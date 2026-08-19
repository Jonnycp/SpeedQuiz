const express = require('express');
const authRoutes = require('./auth.routes.js');
const lobbiesRoutes = require("./lobbies.routes.js")
const gamesRoutes = require("./games.routes.js");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/lobbies', lobbiesRoutes); 
router.use("/games", gamesRoutes);

module.exports = router;
