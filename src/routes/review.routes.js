import express from "express";
import {
  createReview,
  getReviewsByProduct,
  checkCanReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/product/:productId", getReviewsByProduct);
router.get("/can-review/:productId", verifyToken, checkCanReview);

export default router;
