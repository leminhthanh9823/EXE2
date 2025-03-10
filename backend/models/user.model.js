import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    age: { type: Number, required: false },
    lastLoginDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpireAt: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpireAt: { type: Date },
    healthGoals: { type: String, required: false }, // Mục tiêu sức khỏe và dinh dưỡng
    activityLevel: { type: String, required: false }, // Mức độ tập luyện
    dailyWork: { type: String, required: false }, // Công việc hàng ngày
    foodAllergies: { type: String, required: false }, // Dị ứng thực phẩm
    medicalConditions: { type: String, required: false }, // Bệnh lý nền
  },
  { timestamps: true }
);

// Tạo mô hình Mongoose từ schema
const User = mongoose.model("User", userSchema);

// Xuất mô hình
export default User;