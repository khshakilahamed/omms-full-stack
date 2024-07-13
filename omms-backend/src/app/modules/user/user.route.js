const express = require("express");
const { createUser, deleteUser, getAllUsers, getUserById, updateUserById } = require("./user.controller");
const { USER_ROLE } = require("@prisma/client");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), createUser);
router.get("/", auth(USER_ROLE.admin), getAllUsers);
router.get("/:id", auth(USER_ROLE.admin), getUserById);
router.patch("/:id", auth(USER_ROLE.admin), updateUserById);
router.delete("/:id", auth(USER_ROLE.admin), deleteUser);

module.exports = router;
