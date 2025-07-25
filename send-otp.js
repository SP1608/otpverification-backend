

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendOTP = async (req, res) => {
//   const { email } = req.body;
//   console.log("📩 Request to send OTP to:", email);

//   // Log environment variables (for debugging, remove in production)
//   console.log("🛠️ Email user:", process.env.EMAIL_USER);
//   console.log("🛠️ Email pass present:", !!process.env.EMAIL_PASS); // true/false

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//   console.log("🔐 Generated OTP:", otp);

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verify your Account to Reset Password",
//     text: `Your OTP to verify your account is : ${otp}`,
//   };

//   try {
//     console.log("📨 Sending email...");
//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.response);

//     res.json({ success: true, otp }); // Send OTP only during testing
//   } catch (error) {
//     console.error("❌ Error while sending OTP:", error);
//     res.status(500).send("Failed to send OTP");
//   }
// };


// module.exports = {
//   sendOTP
// };

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // In-memory store for OTPs
// const otpStore = new Map();

// const sendOTP = async (req, res) => {
//   const { email } = req.body;
//   console.log("📩 Request to send OTP to:", email);

//   console.log("🛠️ Email user:", process.env.EMAIL_USER);
//   console.log("🛠️ Email pass present:", !!process.env.EMAIL_PASS);

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // String for easy comparison
//   console.log("🔐 Generated OTP:", otp);

//   // Store OTP in memory
//   otpStore.set(email, otp);

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verify your Account to Reset Password",
//     text: `Your OTP to verify your account is : ${otp}`,
//   };

//   try {
//     console.log("📨 Sending email...");
//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.response);

//     res.json({ success: true, message: "OTP sent successfully" }); // ✅ No OTP sent in production
//   } catch (error) {
//     console.error("❌ Error while sending OTP:", error);
//     res.status(500).send("Failed to send OTP");
//   }
// };

// // Export both sendOTP and the OTP store
// module.exports = {
//   sendOTP,
//   otpStore,
// };


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
    text: `Your OTP to verify your account is: ${otp}`,
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
