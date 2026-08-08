const express = require("express");
const AuthController = require("../controllers/Auth.controller.js");

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/logout", AuthController.logout)


module.exports = router;
