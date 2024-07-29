const express = require("express");
const { createMealItem, getAllMealItems, getMealItemById, updateMealItemById, deleteMealItem } = require("./mealItems.controller");
const { USER_ROLE } = require("@prisma/client");

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), createMealItem);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.general_user), getAllMealItems);
router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.general_user), getMealItemById);
router.patch("/:id", auth(USER_ROLE.admin), updateMealItemById);
router.delete("/:id", auth(USER_ROLE.admin), deleteMealItem);

module.exports = router;
