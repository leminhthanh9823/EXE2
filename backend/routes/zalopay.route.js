import express from "express";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
import Transaction from "../models/transaction.model.js";

dotenv.config();
const router = express.Router();

const ZALOPAY_APP_ID = process.env.ZALOPAY_APP_ID;
const ZALOPAY_KEY_1 = process.env.ZALOPAY_KEY_1;
const ZALOPAY_ENDPOINT = "https://openapi.zalopay.vn/v2/create";

// Tạo giao dịch mới
router.post("/create", async (req, res) => {
  try {
    
    const {userId, amount, code } = req.body;
    const app_trans_id = `${Date.now()}`; // Mã giao dịch duy nhất
    const order = {
      app_id: ZALOPAY_APP_ID,
      app_trans_id,
      app_user: userId,
      amount,
      embed_data: "{}",
      item: "[]",
      description: `Thanh toán đơn hàng #${app_trans_id}`,
      timestamp: Date.now(),
    };
    console.log("ZaloPay order:", order);

    // Tạo chữ ký bảo mật
    const data = `${ZALOPAY_APP_ID}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.embed_data}|${order.item}|${order.timestamp}`;
    order.mac = crypto.createHmac("sha256", ZALOPAY_KEY_1).update(data).digest("hex");
    
    const response = await axios.post(ZALOPAY_ENDPOINT, null, { params: order });
    console.log("ZaloPay response:", response.data);
    // Lưu giao dịch vào DB
    const newTransaction = new Transaction({
      code: app_trans_id,
      amount,
      status: "pending",
    });
    await newTransaction.save();
    console.log("New transaction:", newTransaction);
    
    res.json({ payment_url: response.data.order_url, transaction_id: app_trans_id });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo giao dịch", error });
  }
});

// API kiểm tra trạng thái giao dịch
router.get("/status/:transactionId", async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ code: req.params.transactionId });

    if (!transaction) return res.status(404).json({ message: "Không tìm thấy giao dịch" });

    res.json({ status: transaction.status });
  } catch (error) {
    res.status(500).json({ message: "Lỗi kiểm tra trạng thái giao dịch" });
  }
});

export default router;
