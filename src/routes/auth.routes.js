import express from "express";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/me", verifyToken, getCurrentUser);

export default router;