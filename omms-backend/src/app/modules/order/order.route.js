const express = require("express");
const { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrder, getMyOrders } = require("./order.controller");
const { auth } = require("../../middlewares/auth");
const { USER_ROLE } = require("@prisma/client");

const router = express.Router();

router.post("/", auth(USER_ROLE.general_user, USER_ROLE.admin), createOrder);
router.get("/", auth(USER_ROLE.admin), getAllOrders);
router.get("/my-orders", auth(USER_ROLE.admin, USER_ROLE.general_user), getMyOrders);
router.get("/:id", auth(USER_ROLE.admin), getOrderById);
router.patch("/:id", auth(USER_ROLE.admin), updateOrderById);
router.delete("/:id", auth(USER_ROLE.admin), deleteOrder);

module.exports = router;
