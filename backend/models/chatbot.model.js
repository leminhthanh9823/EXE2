import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatBotSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => randomUUID(),
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatBot = mongoose.model("ChatBot", chatBotSchema);

export default ChatBot;
