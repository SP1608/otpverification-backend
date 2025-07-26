const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { sendOTP } = require("./send-otp");
const { verifyOTP } = require("./verify-otp"); //  Import verifyOTP handler

const app = express();
app.use(cors());
app.use(bodyParser.json());

//  Send OTP endpoint
app.post("/send-otp", sendOTP);

//  Verify OTP endpoint
app.post("/verify-otp", verifyOTP);


// app.listen(3000, () => {
//   console.log("🚀 Server is running on http://localhost:3000");
// });
module.exports = app;
