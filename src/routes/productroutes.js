const express = require("express");
const productController = require("../Controllers/productcontroller");
// const authenticate = require("../Middleware/authenticate");
// const authorise = require("../Middleware/authorise");

const router = express.Router();

// <------------------------Productapi--------------------------------------->
// router.get(
//   "/",
//   //   authenticate,
//   //   authorise(["Admin", "Manager"]),
//   productController.createProduct
// );

// router.post(
//   "/",
// //   authenticate,
// //   authorise(["Admin", "Manager"]),
//   productController.postAllProducts
// );

// router.patch(
//   "/:id",
// //   authenticate,
// //   authorise(["Admin", "Manager"]),
//   productController.patchAllProducts
// );

// Create a new product
router.post("/", productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

router.get("/", productController.paginationqueryparama);

// Get a single product by ID
router.get("/:id", productController.getProductById);

// Update a product
router.patch("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
