const express = require("express");
const { createMealItem, getAllMealItems, getMealItemById, updateMealItemById, deleteMealItem } = require("./mealItems.controller");

const router = express.Router();

router.post("/", createMealItem);
router.get("/", getAllMealItems);
router.get("/:id", getMealItemById);
router.patch("/:id", updateMealItemById);
router.delete("/:id", deleteMealItem);

module.exports = router;
