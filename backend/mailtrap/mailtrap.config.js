import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Default sender details
export const sender = {
  email: process.env.FROM_EMAIL,
  name: process.env.FROM_NAME,
};
