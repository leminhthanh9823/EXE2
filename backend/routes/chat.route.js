import express from "express";
import Chat from "../models/chat.model.js";

const router = express.Router();

router.get("/messages", async (req, res) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 }); // Sort by timestamp
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;