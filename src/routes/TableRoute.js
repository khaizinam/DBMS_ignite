const express = require("express");
const router = express.Router();
const TableController = require("../controller/TableController.js");

/* ------- OPEN GATEWAY ------- */
router.get("/create", TableController.createTable);
router.get("/users", TableController.getUserList);
module.exports = router;
