import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true }, 
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
