const express = require("express");
const router = express.Router();
const TableController = require("../controller/TableController.js");

/* ------- OPEN GATEWAY ------- */
router.get("/create", TableController.createTable);
router.get("/users", TableController.getUserList);

// PRODUCTS
router.get("/product", TableController.getProducts);
router.post("/product", TableController.getProductsSearch);
router.put("/product", TableController.updateProduct);
router.post("/product/create", TableController.createProduct);
router.post("/product/delete", TableController.deleteProduct);
router.post("/product/id", TableController.getOneProduct);
router.post("/product/category", TableController.getProductByCategory);

// Buy
router.post("/buy", TableController.createBuy);
router.post("/buy/search", TableController.searchBuyHistory);
module.exports = router;
