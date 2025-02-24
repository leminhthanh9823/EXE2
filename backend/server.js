// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import foodRoutes from "./routes/food_log.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import menuRoutes from "./routes/menu.route.js";
import transactionRoutes from "./routes/transaction.route.js";
const app = express();

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

app.use("/api/logs", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("public/uploads"));
app.use("/api/menu", menuRoutes);
app.use("/api/transactions", transactionRoutes);

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

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
