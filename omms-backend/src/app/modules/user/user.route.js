const express = require("express");
const { createUser, deleteUser, getAllUsers, getUserById, updateUserById } = require("./user.controller");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUser);

module.exports = router;
