import Chat from "../models/chat.model.js";
import User from "../models/user.model.js"; // Import model User nếu bạn có

// Lấy tất cả tin nhắn
export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { userName, message, to } = req.body;
  try {
    const newMessage = new Chat({ userName, message, to });
    await newMessage.save();

    // 🔴 Gửi tin nhắn qua socket.io
    req.app.get("io").emit("message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Gửi thông tin khách hàng
export const sendCustomerInfo = async (req, res) => {
  const { to } = req.body;
  try {
    const user = await User.findOne({ name: to });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    const formatArray = (arr) =>
      arr && arr.length > 0 ? arr.join(", ") : "Chưa cung cấp thông tin";

    const infoMessage = `Thông tin khách hàng: \n
      - Tên: ${user.name} \n
      - Email: ${user.email} \n
      - Giới tính: ${user.sex ?? "Chưa cung cấp thông tin"} \n
      - age: ${user.sex ?? "Chưa cung cấp thông tin"} \n
      - Chiều cao: ${user.height ?? "Chưa cung cấp thông tin"} \n
      - Cân nặng: ${user.weight ?? "Chưa cung cấp thông tin"} \n
      - Dị ứng: ${formatArray(user.health_base?.food_allergies)} \n
      - Điều kiện cơ bản: ${formatArray(
        user.health_base?.underlying_conditions
      )} \n
      - Mục tiêu mong muốn: ${user.health_goals ?? "Chưa cung cấp thông tin"} \n
      - Nghề nghiệp: ${user.current_job ?? "Chưa cung cấp thông tin"} 
    `;

    const newMessage = new Chat({
      userName: "Admin",
      message: infoMessage,
      to,
    });
    await newMessage.save();
    req.app.get("io").emit("message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
