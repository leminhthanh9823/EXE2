import express from "express";
import {
    generateChatCompletion,
    sendChatsToUser
} from "../controllers/chatbot.controller.js";

const router = express.Router();

router.get("/all-chats", sendChatsToUser);
router.post("/new", generateChatCompletion);

export default router;
