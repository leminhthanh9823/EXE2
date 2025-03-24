import express from "express";
import {
  createVoucher,
  getAllVouchers,
  redeemVoucher,
} from "../controllers/voucher.controller.js";
import { getUserVouchers } from "../controllers/userVoucher.controller.js";

const router = express.Router();

// Admin tạo voucher
router.post("/create", createVoucher);

// Lấy danh sách voucher
router.get("/", getAllVouchers);

// Người dùng đổi điểm lấy voucher
router.post("/redeem", redeemVoucher);

// Lấy danh sách voucher của người dùng
router.get("/user-vouchers/:userId", getUserVouchers);

export default router;
