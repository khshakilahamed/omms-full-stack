const express = require("express");
const { createAvailableMealPerDay, getAllAvailableMealsPerDay, getAvailableMealPerDayById, updateAvailableMealPerDayById, deleteAvailableMealPerDayItem } = require("./availableMealPerDay.controller")

const router = express.Router();

router.post("/", createAvailableMealPerDay);
router.get("/", getAllAvailableMealsPerDay);
router.get("/:id", getAvailableMealPerDayById);
router.patch("/:id", updateAvailableMealPerDayById);
router.delete("/:id", deleteAvailableMealPerDayItem);

module.exports = router;
