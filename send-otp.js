// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // In-memory store for OTPs
// const otpStore = new Map();

// const sendOTP = async (req, res) => {
//   const { email } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   // Store the OTP for the given email in memory
//   otpStore.set(email, otp);

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verify your Account to Reset Password",
//     // text: `Your OTP to verify your account is: ${otp}`,
//     html: `
//       <div style="font-family: sans-serif; font-size: 16px;">
//         <p><strong>Your OTP to verify your account is:</strong></p>
//         <h2>${otp}</h2>
//       </div>
//     `
// };
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Error while sending OTP:", error);
//     res.status(500).send("Failed to send OTP");
//   }
// };

// module.exports = {
//   sendOTP,
//   otpStore,
// };


// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // In-memory store for OTPs
// const otpStore = new Map();

// const sendOTP = async (req, res) => {
//   const { email } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   // Store the OTP in memory for that email
//   otpStore.set(email, otp);

//   // ✅ Move mailOptions **inside** the try block
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Verify your Account to Reset Password",
//       html: `
//         <div style="font-family: sans-serif; font-size: 16px;">
//           <p><strong>Your OTP to verify your account is:</strong></p>
//           <h2>${otp}</h2>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`✅ OTP sent to ${email}: ${otp}`);
//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("❌ Error while sending OTP:", error);
//     res.status(500).send("Failed to send OTP");
//   }
// };

// module.exports = {
//   sendOTP,
//   otpStore,
// };


const nodemailer = require("nodemailer");
require("dotenv").config();

const otpStore = new Map();

const sendOTP = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
    const mailOptions = {
      from: `"Framer OTP" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your OTP for Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4CAF50;">Your One-Time Password (OTP)</h2>
          <p>Hello,</p>
          <p>Please use the following OTP to verify your email address:</p>
          <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #333;">
            ${otp}
          </div>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr style="margin-top: 30px;" />
          <p style="font-size: 12px; color: gray;">Framer Verification System</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error while sending OTP:", error);
    res.status(500).send("Failed to send OTP");
  }
};

module.exports = {
  sendOTP,
  otpStore,
};


