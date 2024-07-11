const express = require("express");
const { createUser } = require("./user.controller")

const router = express.Router();

// router.get("/", createUser);
router.post("/", createUser);

module.exports = router;
