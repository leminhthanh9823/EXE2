import UserVoucher from "../models/userVoucher.model.js";
import Voucher from "../models/voucher.model.js";

export const getUserVouchers = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('userVoucher controller:', userId);
    const userVouchers = await UserVoucher.find({ userId }).populate("voucherId");
    res.status(200).json(userVouchers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user vouchers", error });
  }
};
