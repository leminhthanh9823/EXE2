import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Mã voucher
  description: { type: String, required: true }, // Mô tả voucher
  pointsRequired: { type: Number, required: true }, // Số điểm cần để đổi voucher
  expirationDate: { type: Date, required: true }, // Ngày hết hạn voucher
  isActive: { type: Boolean, default: true }, // Trạng thái còn sử dụng được hay không
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
