import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getUsers);

export default router;
