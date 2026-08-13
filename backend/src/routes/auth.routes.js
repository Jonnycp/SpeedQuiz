const express = require("express");
const AuthController = require("../controllers/Auth.controller.js");
const { isAuth } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout)
router.post("/refresh", AuthController.refresh)
router.put("/profile", isAuth, AuthController.updateUser)

module.exports = router;