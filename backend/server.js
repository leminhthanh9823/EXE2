import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import foodRoutes from "./routes/food_log.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js"; // Import the admin routes
import chatRoutes from "./routes/chat.route.js"; // Import the chat routes
import voucherRoutes from "./routes/voucher.routes.js";
import mealRoutes from "./routes/meal.route.js";
import chatbot from "./routes/chatbot.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import menuRoutes from "./routes/menu.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import { Server } from "socket.io";
import http from "http";
import Chat from "./models/chat.model.js"; 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL, // Your frontend URL
  credentials: true, // Allow credentials such as cookies or tokens
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.urlencoded({ extended: true }));

//api auth người dùng
app.use("/api/auth", authRoutes);
//api nhật ký
app.use("/api/logs", foodRoutes);
//api lấy ảnh
app.use("/uploads", express.static("public/uploads"));
//api menu
app.use("/api/menus", menuRoutes);
//api meal
app.use("/api/meals", mealRoutes);
//api thanh toán
app.use("/api/transactions", transactionRoutes);
//api giao dịch
app.use("/vouchers", voucherRoutes);
// Use the admin routes
app.use("/api/admin", adminRoutes);
// Use the chat routes
app.use("/api/chat", chatRoutes);
//chatbot
app.use("/api/chatbot", chatbot);
//voucher
app.use("/api/vouchers", voucherRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Socket.IO setup
io.on("connection", (socket) => {
  socket.on("message", async (data) => {
    const { userName, message, to } = data;
    console.log("Received message:", data); // Add this line for debugging
    const chatMessage = new Chat({ userName, message, to });
    try {
      // await chatMessage.save(); // Save the message to the database
      console.log("Message saved:", chatMessage); // Add this line for debugging
      // io.emit("message", chatMessage);
    } catch (error) {
      console.error("Error saving message:", error); // Add this line for debugging
    }
  });

  socket.on("disconnect", () => {});
});

// Start the server
server.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:5000");
});
