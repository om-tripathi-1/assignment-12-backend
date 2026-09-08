import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUser,
} from "../controllers/order.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/user", verifyToken, getOrdersByUser);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;
