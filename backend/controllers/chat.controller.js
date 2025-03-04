import Chat from "../models/chat.model.js";

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: 1 }); // Sort by createdAt
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  const { userName, message, to } = req.body;
  try {
    const newMessage = new Chat({ userName, message, to });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};