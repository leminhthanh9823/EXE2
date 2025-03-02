import express from "express";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
import Transaction from "../models/transaction.model.js";
import CryptoJS from "crypto-js";

dotenv.config();
const router = express.Router();

const ZALOPAY_APP_ID = process.env.ZALOPAY_APP_ID;
const ZALOPAY_KEY_1 = process.env.ZALOPAY_KEY_1;
const ZALOPAY_KEY_2 = process.env.ZALOPAY_KEY_2;
const ZALOPAY_ENDPOINT = "https://openapi.zalopay.vn/v2/create";

// Tạo giao dịch mới
router.post("/create", async (req, res) => {
  try {
    const embed_data = {
      redirecturl: "https://fitmenu.store/transactions",
    };
    const { userId, amount, code } = req.body;
    const app_trans_id = `${Date.now()}`; // Mã giao dịch duy nhất
    const order = {
      app_id: ZALOPAY_APP_ID,
      app_trans_id,
      app_user: userId,
      amount,
      embed_data: JSON.stringify(embed_data),
      item: "[]",
      bank_code: "zalopayapp",
      description: `Thanh toán đơn hàng #${app_trans_id}`,
      timestamp: Date.now(),
      callback_url: `https://fitmenu.store/api/zalopay/callback`,
    };
    console.log("ZaloPay order:", order);

    // Tạo chữ ký bảo mật
    const data = `${ZALOPAY_APP_ID}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.embed_data}|${order.item}|${order.timestamp}`;
    order.mac = crypto
      .createHmac("sha256", ZALOPAY_KEY_1)
      .update(data)
      .digest("hex");

    const response = await axios.post(ZALOPAY_ENDPOINT, null, {
      params: order,
    });
    console.log("ZaloPay response:", response.data);
    // Lưu giao dịch vào DB
    const newTransaction = new Transaction({
      code: app_trans_id,
      amount,
      status: "pending",
    });
    await newTransaction.save();
    console.log("New transaction:", newTransaction);

    res.json({
      payment_url: response.data.order_url,
      transaction_id: app_trans_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo giao dịch", error });
  }
});

// API kiểm tra trạng thái giao dịch
router.get("/status/:transactionId", async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      code: req.params.transactionId,
    });

    if (!transaction)
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });

    res.json({ status: transaction.status });
  } catch (error) {
    res.status(500).json({ message: "Lỗi kiểm tra trạng thái giao dịch" });
  }
});

// app.post('/callback', (req, res) => {
//   let result = {};

//   try {
//     let dataStr = req.body.data;
//     let reqMac = req.body.mac;

//     let mac = CryptoJS.HmacSHA256(dataStr, ZALOPAY_KEY_2).toString();
//     console.log("mac =", mac);

//     // kiểm tra callback hợp lệ (đến từ ZaloPay server)
//     if (reqMac !== mac) {
//       // callback không hợp lệ
//       result.return_code = -1;
//       result.return_message = "mac not equal";
//     }
//     else {
//       // thanh toán thành công
//       // merchant cập nhật trạng thái cho đơn hàng
//       let dataJson = JSON.parse(dataStr, config.key2);
//       console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

//       result.return_code = 1;
//       result.return_message = "success";
//     }
//   } catch (ex) {
//     result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
//     result.return_message = ex.message;
//   }

//   // thông báo kết quả cho ZaloPay server
//   res.json(result);
// });

export default router;
