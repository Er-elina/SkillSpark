const CategoryModel = require("../models/categoryModel");

// controller to create a new category

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const category = await CategoryModel.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new CategoryModel({ name });
    const categoryResponse = await newCategory.save();
    return res
      .status(201)
      .json({ message: "Category created", category: categoryResponse });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller to get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({ categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller to update a category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    return res
      .status(200)
      .json({ message: "Category updated", category: updatedCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller to delete a category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};