import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    sex: { type: String, enum: ["nam", "nữ", "khác"], required: false },
    height: { type: Number, required: false, min: 0, max: 250 }, // cm
    weight: { type: Number, required: false, min: 0, max: 500 }, // kg
    age: { type: Number, required: false, min: 1, max: 120 },
    health_base: {
      food_allergies: { type: [String], default: [] },
      underlying_conditions: { type: [String], default: [] },
    },
    health_goals: {
      type: String,
      enum: [
        "giảm cân",
        "tăng cân",
        "tăng cơ",
        "duy trì sức khỏe",
        "cải thiện năng lượng",
      ],
      required: false,
    },
    exercises: [
      {
        exercise_time: { type: Number, default: 0, min: 0, max: 7 },
        exercise_type: {
          type: String,
          enum: ["nhẹ", "vừa", "nặng"],
          required: true,
        },
      },
    ],
    current_job: { type: String, required: false, trim: true },
    goal_weight: { type: Number, required: false, min: 0, max: 500 }, // kg
    lastLoginDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
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
