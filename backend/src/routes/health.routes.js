const express = require("express");
const HealthController = require("../controllers/Health.controller.js");

const router = express.Router();

router.get("/", HealthController.healthCheck);

module.exports = router;
