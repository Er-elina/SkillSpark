const express = require("express");
const router = express.Router();
const {
  createProduct,
  searchProducts,
  getProducts,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizationMiddleware");
const { productImage } = require("../middlewares/uploadMiddleware");

/**
 * description: to create a new product
 * method: POST
 * route: /api/products/create
 * access: private
 * return: response message and the created product
 */

router.post("/create", authMiddleware,
   authorizeRole("admin"),
   productImage.single('productImage'), createProduct);

/**
 * description: to get all products
 * method: GET
 * route: /api/products
 * access: public
 * return: response message and the found products
 */

router.get("/", searchProducts);

/**
 * description: to search products
 * method: GET
 * route: /api/products/search
 * access: public
 * return: response message and the found products
 */

router.get("/search", searchProducts);

// to get all products

router.get("/getallproducts", getProducts);

module.exports = router;