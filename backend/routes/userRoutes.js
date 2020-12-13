import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Fetch all products
// @route  GET /api/users
// access Public
router.post("/login", authUser);
router.post("/", registerUser);
router.get("/profile", protect, getUserProfile);
export default router;
