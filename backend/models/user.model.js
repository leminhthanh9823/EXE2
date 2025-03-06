import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    age: { type: Number, required: false },
    lastLoginDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false},
    verificationToken: { type: String },
    verificationTokenExpireAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpireAt: { type: Date },
  },
  { timestamps: true }
);

// Tạo mô hình Mongoose từ schema
const User = mongoose.model("User", userSchema);

// Xuất mô hình
export default User;
