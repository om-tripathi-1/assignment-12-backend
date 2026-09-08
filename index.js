import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import productRoutes from "./src/routes/products.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
