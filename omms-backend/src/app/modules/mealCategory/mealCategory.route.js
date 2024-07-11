const express = require("express");
const { createMealCategory, deleteMealCategory, getAllMealCategories, getMealCategoryById, updateMealCategoryById } = require("./mealCategory.controller");

const router = express.Router();

router.post("/", createMealCategory);
router.get("/", getAllMealCategories);
router.get("/:id", getMealCategoryById);
router.patch("/:id", updateMealCategoryById);
router.delete("/:id", deleteMealCategory);

module.exports = router;
