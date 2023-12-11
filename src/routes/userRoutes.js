const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

/* ------- OPEN GATEWAY ------- */

router.get("/list-user", userController.getUsers);

/* ----------------------------- */
module.exports = router;
