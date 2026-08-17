const express = require('express');
const authRoutes = require('./auth.routes.js');
const lobbiesRoutes = require("./lobbies.routes.js")

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/lobbies', lobbiesRoutes); 

module.exports = router;
