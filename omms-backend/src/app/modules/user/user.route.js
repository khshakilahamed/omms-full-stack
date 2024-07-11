const express = require("express");
const { createUser, deleteUser, getAllUsers } = require("./user.controller")

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
