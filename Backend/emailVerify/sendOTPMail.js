const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

async function sendOTPMail(otp, email) {

  console.log("OTP:", otp, "Email:", email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
    console.log(info.response);
  } catch (error) {
    console.log("Mail error:", error);
  }
}

module.exports = sendOTPMail;