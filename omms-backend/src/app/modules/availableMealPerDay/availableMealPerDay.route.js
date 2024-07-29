const express = require("express");
const { createAvailableMealPerDay, getAllAvailableMealsPerDay, getAvailableMealPerDayById, updateAvailableMealPerDayById, deleteAvailableMealPerDayItem } = require("./availableMealPerDay.controller");
const { USER_ROLE } = require("@prisma/client");

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), createAvailableMealPerDay);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.general_user), getAllAvailableMealsPerDay);
router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.general_user), getAvailableMealPerDayById);
router.patch("/:id", auth(USER_ROLE.admin), updateAvailableMealPerDayById);
router.delete("/:id", auth(USER_ROLE.admin), deleteAvailableMealPerDayItem);

module.exports = router;
