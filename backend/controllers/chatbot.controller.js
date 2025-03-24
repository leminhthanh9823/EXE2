import axios from "axios";
import dotenv from "dotenv";
import User from "../models/user.model.js";
// import ChatBot from "../models/chatbot.model.js";
import mongoose from "mongoose";

dotenv.config();
const OPENROUTER_API_KEY =
  "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";

export const generateChatCompletion = async (req, res, next) => {
  const { userId, message } = req.body;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.chats.push({ role: "user", content: message });

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-27b-it:free",
        messages: user.chats,
        stream: false,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );

    const botMessage =
      response.data.choices[0]?.message?.content || "No response";
    user.chats.push({ role: "assistant", content: botMessage });

    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Chatbot API error", error: error.message });
  }
};
export const sendChatsToUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const user = await User.findById(userId).populate("chats").exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "OK", chats: user.chats || [] });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
