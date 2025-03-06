import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs"; // Import fs để kiểm tra thư mục
import {
  getFoodLogs,
  createFoodLog,
  updateFoodLog,
  deleteFoodLog,
} from "../controllers/food_log.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

// Đảm bảo thư mục "public/uploads/" tồn tại
const uploadDir = "public/uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình Multer để lưu file vào public/uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/food-log", authenticateUser, getFoodLogs);
router.post("/food-log", authenticateUser, upload.any(), createFoodLog);
router.put("/food-log/:id", authenticateUser, upload.any(), updateFoodLog);
router.delete("/food-log/:id", authenticateUser, deleteFoodLog);
export default router;
