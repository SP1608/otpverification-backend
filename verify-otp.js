const { otpStore } = require("./send-otp"); // Import otpStore

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  const storedOTP = otpStore.get(email);
  
  if (storedOTP && storedOTP === otp) {
    otpStore.delete(email); // Remove OTP after successful verification
    res.status(200).json({ success: true, message: "OTP verified successfully. Account verified." });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
};
