import Voucher from "../models/voucher.model.js";
import UserPoint from "../models/userPoint.model.js";
import mongoose from "mongoose";

/**
 * Admin tạo voucher mới
 */
export const createVoucher = async (req, res) => {
  try {
    const { code, description, pointsRequired, expirationDate } = req.body;

    const newVoucher = new Voucher({
      code,
      description,
      pointsRequired,
      expirationDate,
    });

    await newVoucher.save();
    res.status(201).json({ message: "Voucher created!", data: newVoucher });
  } catch (error) {
    res.status(500).json({ message: "Error creating voucher", error });
  }
};

/**
 * Lấy danh sách voucher
 */
export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({ isActive: true });
    res.status(200).json({ success: true, data: vouchers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vouchers", error });
  }
};

/**
 * Người dùng đổi điểm lấy voucher
 */
export const redeemVoucher = async (req, res) => {
  try {
    const { userId, voucherCode } = req.body;

    // Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // Kiểm tra voucher tồn tại và còn hiệu lực
    const voucher = await Voucher.findOne({
      code: voucherCode,
      isActive: true,
    });

    // if (
    //   !voucher ||
    //   !voucher.expirationDate ||
    //   new Date() > new Date(voucher.expirationDate)
    // ) {
    //   return res.status(400).json({ message: "Voucher is invalid or expired" });
    // }

    // Kiểm tra điểm của người dùng
    let userPoint = await UserPoint.findOne({
      userId: userId,
    });
    if (!userPoint) {
      return res.status(404).json({ message: "User points not found" });
    }

    if (userPoint.points < voucher.pointsRequired) {
      return res.status(400).json({ message: "Not enough points" });
    }

    // Trừ điểm & gửi voucher
    userPoint.points -= voucher.pointsRequired;
    await userPoint.save();

    res.status(200).json({
      success: true,
      message: "Voucher redeemed successfully!",
      data: voucher,
    });
  } catch (error) {
    console.error("Error redeeming voucher:", error);
    res.status(500).json({ message: "Error redeeming voucher", error });
  }
};
