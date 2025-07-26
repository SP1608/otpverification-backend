const nodemailer = require("nodemailer");
require("dotenv").config();

// In-memory store for OTPs
const otpStore = new Map();

const sendOTP = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the OTP for the given email in memory
  otpStore.set(email, otp);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your Account to Reset Password",
    // text: `Your OTP to verify your account is: ${otp}`,
    html: `
      <div style="font-family: sans-serif; font-size: 16px;">
        <p><strong>Your OTP to verify your account is:</strong></p>
        <h2>${otp}</h2>
      </div>
    `
};
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error while sending OTP:", error);
    res.status(500).send("Failed to send OTP");
  }
};

module.exports = {
  sendOTP,
  otpStore,
};
