import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendResetSuccessEmail,
} from "../mailtrap/email.js";
import crypto from "crypto";

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const verificationCode = generateVerificationCode();
      const verificationTokenExpireAt = Date.now() + 20 * 60 * 60 * 1000;
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        username: email,
        verificationToken: verificationCode,
        verificationTokenExpireAt: verificationTokenExpireAt,
      });

      generateTokenAndSetCookie(res, user._id);

      await sendVerificationEmail(user.email, verificationCode);

      if (user) {
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            isVerified: user.isVerified,
          },
        });
      } else {
        return res.status(400).json({ message: "Failed to create user" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateTokenAndSetCookie(res, user._id);

    user.lastLoginDate = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
};

const verifyemail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({ verificationToken: code }).select(
      "verificationTokenExpireAt email name isVerified"
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }
    if (user.verificationTokenExpireAt < Date.now()) {
      return res.status(400).json({ message: "Verification code expired" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    return res
      .status(200)
      .json({ message: "Email verified successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpireAt = resetTokenExpireAt;

    await user.save();

    await sendForgotPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  console.log("req.userId: ", req.userId);
  try {
    const user = await User.findById(req.userId); // Assuming req.userId contains the authenticated user's ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      name,
      sex,
      height,
      weight,
      age,
      health_base,
      health_goals,
      exercises,
      current_job,
      goal_weight,
    } = req.body; // Tìm user trước

    let user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    } // Kiểm tra và cập nhật các trường, nếu thiếu thì gán giá trị mặc định

    user.name = name ?? user.name;
    user.sex = sex ?? user.sex;
    user.height = height ?? user.height ?? 0;
    user.weight = weight ?? user.weight ?? 0;
    user.age = age ?? user.age ?? 0;
    user.health_base = health_base ??
      user.health_base ?? { food_allergies: [], underlying_conditions: [] };
    user.health_goals = health_goals ?? user.health_goals ?? "";
    user.exercises = exercises ??
      user.exercises ?? [{ exercise_time: 0, exercise_type: "nhẹ" }];
    user.current_job = current_job ?? user.current_job ?? "";
    user.goal_weight = goal_weight ?? user.goal_weight ?? 0; // Lưu lại user đã cập nhật

    await user.save();

    res.status(200).json({ message: "Cập nhật thành công", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật người dùng", error });
  }
};

export {
  register,
  login,
  logout,
  verifyemail,
  forgotPassword,
  resetPassword,
  checkAuth,
  getUser,
  updateUser,
};
