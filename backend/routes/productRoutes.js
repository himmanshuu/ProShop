import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
} from "../controllers/productController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route  GET /api/products
// access Public
router.get("/", getProducts);

// @desc Single product
// @route  GET /api/products/:id
// access Public
router.get("/:id", getProductById);

// @desc Delete product
// @route  DELETE /api/products/:id
// access Public
router.delete("/:id", protect, adminProtect, deleteProductById);

export default router;
