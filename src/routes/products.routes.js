import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", verifyToken, isAdmin, upload.array("images", 5), updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;
