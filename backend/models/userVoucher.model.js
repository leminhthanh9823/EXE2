import mongoose from "mongoose";

const userVoucherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  voucherId: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher", required: true },
  redeemedAt: { type: Date, default: Date.now },
});

const UserVoucher = mongoose.model("UserVoucher", userVoucherSchema);
export default UserVoucher;
