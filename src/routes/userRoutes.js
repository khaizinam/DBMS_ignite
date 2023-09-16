const express = require("express");
const userController = require("../controller/authController");
const authController = require("../controller/authController");
const router = express.Router();

/* ------- OPEN GATEWAY ------- */
router.post("/login", authController.login);
// router.post("/sign-up", authController.signup);
// router.get("/permission", authController.initPermission);
// /* ---------------------------- */

// /* ----- PROTECTED GATEWAY ----- */
// router.use(authController.protect);
// //--------------------------------
// router.get("/list-user", userController.getUsers);
// router.get("/log-out", authController.logout);
/* ----------------------------- */
module.exports = router;
