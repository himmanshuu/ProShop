import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers
} from "../controllers/userController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/login", authUser);
router.post("/", registerUser);
router.get("/profile", protect, getUserProfile);
router.get("/profiles", protect,adminProtect, getAllUsers);
router.put("/profile", protect, updateUserProfile);
export default router;
