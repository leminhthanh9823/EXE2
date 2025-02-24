import express from "express";
import mongoose from "mongoose";
import {
  login,
  register,
  logout,
  verifyemail,
  forgotPassword,
  resetPassword,
  checkAuth,
  getUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import UserPoint from "../models/userPoint.model.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.get("/me", verifyToken, getUser);

router.get("/points/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User ID:", userId);

    // Kiểm tra xem userId có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "ID không hợp lệ" });
    }

    const userPoints = await UserPoint.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Nếu không tìm thấy, trả về điểm = 0
    const points = userPoints ? userPoints.points : 0;

    console.log("User points:", points);

    res.json({ success: true, points });
  } catch (error) {
    console.error("Lỗi khi lấy điểm người dùng:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyemail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
