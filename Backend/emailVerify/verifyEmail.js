const nodemailer = require("nodemailer")
const dotenv = require("dotenv");
dotenv.config();

async function verifyEmail(token, email) {

    try {
        // Create a reusable transporter object using SMTP transport.
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, // use false for STARTTLS; true for SSL on port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // const { name, subject, email, message } = req.body; // Destructure and retrieve data from request body.

        // // Validate required fields.
        // if (!name || !subject || !email || !message) {
        //     return res
        //     .status(400)
        //     .json({ status: "error", message: "Missing required fields" });
        // }
        // // Prepare the email message options.

        const mailOptions = {
            from: process.env.SENDER_EMAIL, // Sender address from environment variables.
            to: email, // Recipient's name and email address.
            replyTo: process.env.REPLY_TO, // Sets the email address for recipient responses.
            subject: "Email Verification", // Subject line.
            text: `Hil There, You have recently visited our website and entered your email.
Please follow the given link to verify your email
http://localhost:5173/verify/$(token)
Thanks`, // Plaintext body.
        };

        // Send email and log the response.
        const info = await transporter.sendMail(mailOptions);
        return res.status(200).json({ status: "success", message: "Email sent successfully" });

    } catch (err) {

        return res.send({
            status: 500,
            message: "user not authorized",
            err,
        });
    }
}

module.exports = verifyEmail