import mongoose from "mongoose";

const userPointSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  points: { type: Number, default: 0 }, // Số điểm hiện tại của người dùng
  history: [
    {
      type: { type: String, enum: ["earn", "redeem"], required: true }, // Loại: tích điểm hoặc đổi điểm
      points: { type: Number, required: true }, // Số điểm thay đổi
      description: { type: String }, // Lý do (vd: "Mua hàng", "Đổi voucher")
      date: { type: Date, default: Date.now } // Ngày giao dịch
    }
  ]
});

const UserPoint = mongoose.model("UserPoint", userPointSchema);
export default UserPoint;
