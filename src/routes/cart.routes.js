import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", getCart);
router.post("/items", addCartItem);
router.put("/items/:productId", updateCartItem);
router.delete("/items/:productId", removeCartItem);

export default router;