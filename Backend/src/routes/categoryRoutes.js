const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizationMiddleware");
const router = express.Router();

/**
 * description: to create a new category
 * route: POST /api/category
 * access: Private (only admin can create a category)
 * type: POST
 * return:response message
 */
router.post(
  "/",
  // authMiddleware,authorizeRole('admin'),
  createCategory
);

// routes to get all categories
router.get("/", authMiddleware, getCategories);

// routes to update a category
router.put("/:id", authMiddleware, authorizeRole("admin"), updateCategory);

// routes to delete a category
router.delete(
  "/:id",
   authMiddleware, authorizeRole("admin"),
  deleteCategory
);

module.exports = router;