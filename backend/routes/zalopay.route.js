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
    const { userId, amount, menuId, code } = req.body; // Nhận menuId từ request

    const embed_data = {
      redirecturl: "https://fitmenu.store/transactions",
      menuId, // Thêm menuId vào embed_data
    };

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

    // Lưu giao dịch vào DB, thêm menuId vào
    const newTransaction = new Transaction({
      code: app_trans_id,
      userId,
      menuId,
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

app.post("/callback", async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, ZALOPAY_KEY_2).toString();
    console.log("mac =", mac);

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      let dataJson = JSON.parse(dataStr);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      let embedData = JSON.parse(dataJson.embed_data);
      let menuId = embedData.menuId;
      let userId = dataJson.app_user;

      if (!menuId) {
        console.error("Không tìm thấy menuId trong embed_data");
      } else {
        try {
          const response = await axios.post(
            `https://fitmenu.store/${menuId}/customize`,
            { userId }
          );
          await Transaction.findOneAndUpdate(
            { menuId: menuId, userId: userId },
            { status: "completed" },
            { new: true }
          );
          console.log("Menu mới được tạo:", response.data);
        } catch (error) {
          console.error(
            "Lỗi khi tạo menu:",
            error.response?.data || error.message
          );
        }
      }

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0;
    result.return_message = ex.message;
  }

  res.json(result);
});

export default router;
