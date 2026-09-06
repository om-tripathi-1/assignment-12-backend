import express from "express";
import {
  createReview,
  getReviewsByProduct,
} from "../contollers/review.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/product/:productId", getReviewsByProduct);

export default router;
