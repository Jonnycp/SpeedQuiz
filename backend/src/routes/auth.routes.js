const express = require("express");
const AuthController = require("../controllers/Auth.controller.js");

const router = express.Router();

router.post("/login", AuthController.login);

module.exports = router;
