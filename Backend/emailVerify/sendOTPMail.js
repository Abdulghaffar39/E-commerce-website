const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

async function sendOTPMail(otp, email) {

    
    console.log(otp, email);
    // Create a reusable transporter object using SMTP transport.
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    
    const mailOptions = {
        from: process.env.SENDER_EMAIL, // Sender address from environment variables.
        to: email, // Recipient's name and email address.
        subject: "Password Reset OTP", // Subject line.
        html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`
    };
    
    // Send email and log the response.
     transporter.sendMail(mailOptions, function  (error, info) {
        if (error) throw Error(error);
        console.log("OTP send successfuly");
        console.log(info);
    });
    // const info = await transporter.sendMail(mailOptions);
    //     console.log("OTP sent successfully");
    //     console.log(info);
    // return res.status(200).json({ success: true, message: "Email sent successfully" });
}

module.exports = sendOTPMail
