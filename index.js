// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const { sendOTP } = require("./send-otp");
// const { verifyOTP } = require("./verify-otp"); //  Import verifyOTP handler

// const app = express();
// // app.use(cors());
// app.use(
//   cors({
//     origin: "*", // OR better: use Framer preview domain
//     methods: ["POST", "GET"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("OTP Verification API is running!");
// });
// //  Send OTP endpoint
// app.post("/send-otp", sendOTP);

// //  Verify OTP endpoint
// app.post("/verify-otp", verifyOTP);


// // app.listen(3000, () => {
// //   console.log("🚀 Server is running on http://localhost:3000");
// // });
// module.exports = app;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors({
  origin: "*",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type"],
}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("OTP Verification API is running!");
});
app.post("/send-otp", sendOTP);
module.exports = app;
