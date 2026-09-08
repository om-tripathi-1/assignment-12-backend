import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
