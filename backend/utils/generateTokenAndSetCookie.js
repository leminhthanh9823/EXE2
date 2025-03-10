import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Cần HTTPS khi triển khai thực tế
    sameSite: "none", // Để cookie được gửi từ domain khác
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });
};

export default generateTokenAndSetCookie;
