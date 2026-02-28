const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

async function verifyEmail(token, email) {

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
        subject: "Email Verification", // Subject line.
        text: `Hil There, You have recently visited our website and entered your email.
Please follow the given link to verify your email
http://localhost:5173/verify/${token}
Thanks`};

    // Send email and log the response.
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) throw Error(error);
        console.log("Email send successfuly");
        console.log(info);
    });
    // return res.status(200).json({ success: true, message: "Email sent successfully" });
}


module.exports = verifyEmail