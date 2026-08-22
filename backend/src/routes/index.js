const express = require('express');
const authRoutes = require('./auth.routes.js');
const lobbiesRoutes = require("./lobbies.routes.js")
const gamesRoutes = require("./games.routes.js");
const healthRoutes = require("./health.routes.js");

const router = express.Router();

router.use("/health", healthRoutes);
router.use('/auth', authRoutes);
router.use('/lobbies', lobbiesRoutes); 
router.use("/games", gamesRoutes);

module.exports = router;
