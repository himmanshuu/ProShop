import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  newProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc Fetch all products
// @route  GET /api/products
// access Public
router.get("/", getProducts);

// @DESC Create New Product
// @route GET /api/products/new
// access private/admin
router.post("/", protect, adminProtect, newProduct);

// @DESC Update Product
// @route PUT /api/products/:id
// access private/admin
router.put("/:id", protect, adminProtect, updateProduct);

// @desc Single product
// @route  GET /api/products/:id
// access Public
router.get("/:id", getProductById);

// @desc Delete product
// @route  DELETE /api/products/:id
// access private/admin
router.delete("/:id", protect, adminProtect, deleteProductById);

export default router;
