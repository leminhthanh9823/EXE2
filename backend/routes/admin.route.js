import express from "express";
import Chat from "../models/chat.model.js";

const router = express.Router();

router.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;