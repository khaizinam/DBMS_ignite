const express = require("express");
const router = express.Router();
const TableController = require("../controller/TableController.js");

/* ------- OPEN GATEWAY ------- */
router.get("/create", TableController.createTable);
router.get("/users", TableController.getUserList);

// PRODUCTS
router.get("/product", TableController.getProducts);
router.post("/product", TableController.getProductsSearch);
router.post("/product/create", TableController.createProduct);
router.post("/product/id", TableController.getOneProduct);
router.post("/product/category", TableController.getProductByCategory);

module.exports = router;
