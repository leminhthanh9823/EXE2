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
import zalopay from "./routes/zalopay.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import menuRoutes from "./routes/menu.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import { Server } from "socket.io";
import http from "http";
import Chat from "./models/chat.model.js"; // Import the Chat model

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials such as cookies or tokens
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
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
//zalopay
app.use("/api/zalopay", zalopay);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/exe", {
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
  console.log("a user connected");

  socket.on("message", async (data) => {
    const { userName, message } = data;
    console.log("Received message:", data); // Add this line for debugging
    const chatMessage = new Chat({ userName, message });
    try {
      await chatMessage.save(); // Save the message to the database
      console.log("Message saved:", chatMessage); // Add this line for debugging
      io.emit("message", data);
    } catch (error) {
      console.error("Error saving message:", error); // Add this line for debugging
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
