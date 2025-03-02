import express from "express";
import Transaction from "../models/transaction.model.js";

const router = express.Router();

// API lấy danh sách giao dịch
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách giao dịch" });
  }
});

export default router;
