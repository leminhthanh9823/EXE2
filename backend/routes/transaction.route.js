// export default router;
import express from "express";
import QRCode from "qrcode";
import Transaction from "../models/transaction.model.js";
import Menu from "../models/menu.js";

const router = express.Router();

// 🔹 Hàm tính checksum CRC-16
const generateCheckSum = (text) => {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < text.length; i++) {
    let byte = text.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      let bit = ((byte >> (7 - j)) & 1) === 1;
      let c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 ^ bit) {
        crc ^= polynomial;
      }
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase();
};

// 🔹 Hàm tạo mã hash theo logic Laravel
const generateStringHash = (bankCode, bankAccount, amount, message) => {
  const bankIdByCode = {
    BIDV: "970418",
    // Thêm các ngân hàng khác nếu cần
  };

  if (!bankIdByCode[bankCode]) {
    throw new Error(`Unsupported bank code: ${bankCode}`);
  }

  const bankId = bankIdByCode[bankCode];

  // 🔹 Xây dựng các phần giống PHP
  const part12Builder =
    "00" +
    bankId.length.toString().padStart(2, "0") +
    bankId +
    "01" +
    bankAccount.length.toString().padStart(2, "0") +
    bankAccount;

  const part11Builder =
    "0010A000000727" +
    "01" +
    part12Builder.length.toString().padStart(2, "0") +
    part12Builder +
    "0208QRIBFTTA";

  const part1Builder =
    "38" + part11Builder.length.toString().padStart(2, "0") + part11Builder;

  const part21Builder =
    "08" + message.length.toString().padStart(2, "0") + message;

  const part2 =
    "5303704" +
    "54" +
    amount.toString().length.toString().padStart(2, "0") +
    amount +
    "5802VN" +
    "62" +
    part21Builder.length.toString().padStart(2, "0") +
    part21Builder;

  const builder = "000201" + "010212" + part1Builder + part2 + "6304";

  // 🔹 Thêm checksum CRC-16
  return builder + generateCheckSum(builder);
};

// ✅ API tạo giao dịch mới
router.post("/create", async (req, res) => {
  try {
    const { userId, amount, menuId, code, bankCode, bankAccount } = req.body;

    if (typeof amount !== "number" || isNaN(amount)) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a valid number" });
    }
    const existing = await Menu.findOne({ _id: menuId, userId: userId }).sort({
      createdAt: -1,
    });
    if (existing) {
      const packageDays = parseInt(existing.menuPackage);
      if (isNaN(packageDays)) {
        return res
          .status(400)
          .json({ success: false, message: "Dữ liệu menu không hợp lệ" });
      }
      const expirationDate = moment(existingTransaction.createdAt).add(
        packageDays,
        "days"
      );

      // Nếu chưa hết hạn, báo lỗi
      if (moment().isBefore(expirationDate)) {
        return res.status(400).json({
          success: false,
          message: `Bạn đã mua gói này, vui lòng đợi đến ${expirationDate.format(
            "DD/MM/YYYY"
          )} để mua tiếp!`,
        });
      }
    }

    const newTransaction = new Transaction({ userId, menuId, amount, code });
    await newTransaction.save();

    res.status(201).json({ success: true, transaction: newTransaction });
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ API tạo QR code với dữ liệu hash
router.get("/generate-qr/:transactionId", async (req, res) => {
  try {
    console.log("Generating QR Code for transaction:");

    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Giao dịch không tồn tại" });
    }

    // 🔹 Giả sử ta lấy ngân hàng mặc định
    const bankCode = "BIDV";
    const bankAccount = "4880534683";

    // 🔹 Tạo hash dựa trên giao dịch
    const hash = generateStringHash(
      bankCode,
      bankAccount,
      transaction.amount,
      transaction.code
    );

    // 🔹 Sinh mã QR từ hash
    const qrImage = await QRCode.toDataURL(hash);

    res
      .status(200)
      .json({ success: true, qrCode: qrImage, transactionId: transactionId });
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    res.status(500).json({ success: false, message: "Lỗi tạo mã QR" });
  }
});

router.get("/transactions/latest", async (req, res) => {
  try {
    const { userId, menuId, code } = req.query;

    if (!userId || !menuId || !code) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const latestTransaction = await Transaction.findOne({
      userId,
      menuId,
      code,
    }).sort({ createdAt: -1 }); // Lấy giao dịch mới nhất

    if (!latestTransaction) {
      return res.status(404).json({ message: "No transaction found" });
    }

    res.json(latestTransaction);
  } catch (error) {
    console.error("Error fetching latest transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/status/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { userId, menuId } = req.query;

    const transaction = await Transaction.findById(transactionId);
    console.log("Checking transaction status:", transaction);

    if (!transaction) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy giao dịch" });
    }

    if (transaction.status === "completed") {
      const originalMenu = await Menu.findById(menuId);
      console.log("Original menu:", menuId);
      if (!originalMenu) {
        return res
          .status(404)
          .json({ status: "error", message: "Không tìm thấy menu" });
      }

      // Tạo menu mới cho user
      const newMenu = new Menu({
        userId,
        menuPackage: originalMenu.menuPackage,
        days: originalMenu.days,
        price: originalMenu.price,
        isDefault: false,
      });

      await newMenu.save();
    }

    return res.json({ status: transaction.status });
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái giao dịch:", error);
    return res.status(500).json({ status: "error", message: "Lỗi server" });
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("menuId", "menuPackage") // Lấy title của menu
      .populate("userId", "email"); // Lấy name của user

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách giao dịch" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Kiểm tra giao dịch có tồn tại không
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Giao dịch không tồn tại!" });
    }

    // Cập nhật trạng thái giao dịch
    transaction.status = status;
    await transaction.save();
    if (transaction.status === "completed") {
      const originalMenu = await Menu.findById(transaction.menuId);
      console.log("Original menu:", transaction.menuId);
      if (!originalMenu) {
        return res
          .status(404)
          .json({ status: "error", message: "Không tìm thấy menu" });
      }

      // Tạo menu mới cho user
      const newMenu = new Menu({
        userId: transaction.userId,
        menuPackage: originalMenu.menuPackage,
        days: originalMenu.days,
        price: originalMenu.price,
        isDefault: false,
      });

      await newMenu.save();
    }
    res
      .status(200)
      .json({ message: "Cập nhật trạng thái thành công!", transaction });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật trạng thái!" });
  }
});

export default router;
