import express from "express";
import {
  getMessages,
  sendMessage,
  sendCustomerInfo,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/messages", getMessages);
router.post("/messages", sendMessage);
router.post("/sendCustomerInfo", sendCustomerInfo);

export default router;
