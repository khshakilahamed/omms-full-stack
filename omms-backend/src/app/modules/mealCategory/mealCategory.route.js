const express = require("express");
const { createMealCategory, deleteMealCategory, getAllMealCategories, getMealCategoryById, updateMealCategoryById } = require("./mealCategory.controller");
const { USER_ROLE } = require("@prisma/client");

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), createMealCategory);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.general_user), getAllMealCategories);
router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.general_user), getMealCategoryById);
router.patch("/:id", auth(USER_ROLE.admin), updateMealCategoryById);
router.delete("/:id", auth(USER_ROLE.admin), deleteMealCategory);

module.exports = router;
