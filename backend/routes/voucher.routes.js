  import express from "express";
  import {
    createVoucher,
    getAllVouchers,
    redeemVoucher,
  } from "../controllers/voucher.controller.js";

  const router = express.Router();

  // Admin tạo voucher
  router.post("/create", createVoucher);

  // Lấy danh sách voucher
  router.get("/", getAllVouchers);

  // Người dùng đổi điểm lấy voucher
  router.post("/redeem", redeemVoucher);

  export default router;
