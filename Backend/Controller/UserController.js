const User = require("../Models/userModels")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const verifyEmail = require("../emailVerify/verifyEmail");
const { Session } = require("../Models/sessionModels");
const sendOTPMail = require("../emailVerify/sendOtpMail");
// const  sendOTPMail  = require("../emailVerify/sendOTPMail");
const saltRounds = 12;

// { firstname, lastname, profilePic, ProfilePicPublicId, email, password, role, token, isVerified, isLoggedIn, Otp, otpExpiry, address, city, zipCode, phoneNo }

const register = async (req, res) => {

    try {
        const { firstname, lastname, email, password } = req.body

        if (!firstname || !lastname || !email || !password) {

            return res.send({
                status: 401,
                message: "Fil all fileds"
            })
        }

        const findUser = await User.findOne({ email })

        if (findUser) {

            return res.send({
                status: 400,
                message: "User already exits"
            })

        }


        bcrypt.hash(password, saltRounds, function (err, hash) {
            bcrypt.compare(password, hash, async function (err, result) {

                if (err) {
                    console.log(err);
                }

                if (result) {

                    const userdetails = { firstname, lastname, email, password: hash }
                    const user = await new User(userdetails).save()

                    let token = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY, { expiresIn: "10m" })
                    verifyEmail(token, email)
                    user.token = token
                    return res.status(200).send({

                        user,
                        token,
                        success: true,
                        message: "register successfuly"
                    })
                }


            })
        })



    }
    catch (err) {
        return res.send({
            status: 400,
            message: `Error ${err}`
        })
    }

}

const verify = async (req, res) => {

    try {

        const header = req.header("Authorization");
        console.log("Authorization Header:", req.headers.authorization);
        console.log("here is a header", header);

        if (!header) {
            return res.send({

                status: 401,
                message: "Authorization header missing",
            })
        }
        const token = header.split(" ")[1];
        let decoded

        try {

            decoded = jwt.verify(token, process.env.JWTSECRETKEY);

        } catch (error) {

            if (error.name === "TokenExpiredError") {
                return res.send({
                    status: 400,
                    success: false,
                    message: "The register token has expired",
                })
            }

            return res.send({

                status: 400,
                success: false,
                message: "Token verify feild",
            })

        }

        const user = await User.findById(decoded.id)
        console.log(user);

        if (!user) {
            return res.send({
                success: false,
                message: `User not found`
            })
        }


        user.token = null
        user.isVerified = true
        await user.save()
        return res.send({
            user,
            status: 200,
            success: true,
            message: "user verify successfuly"
        })



    } catch (err) {

        return res.send({

            status: 400,
            success: false,
            message: "The register token has expired",
        })

    }
}

const reVerify = async (req, res) => {

    try {


        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {

            return res.send({
                status: 400,
                message: "user not find"
            })

        }

        let token = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY, { expiresIn: "10m" })
        verifyEmail(token, email)
        user.token = token
        await user.save()

        return res.status(200).send({
            success: true,
            message: "verification email again successfuly",
            token: user.token
        })
    } catch (err) {

        return res.send({
            err,
            status: 500,
            success: false,
            message: `${err.message} + Not ReVerified `,
        })

    }
}

async function login(req, res) {
    console.log("Login function called");


    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {

            return res.send({
                status: 500,
                message: "user not exits"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {

            return res.status(400).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        if (user.isVerified === false) {

            return res.status(400).send({
                success: false,
                message: "Verify your account than login"
            })
        }

        // generate token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY, { expiresIn: "10m" })
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY, { expiresIn: "30d" })
        console.log(accessToken);

        user.isLoggedIn = true;
        await user.save()

        console.log(user.isLoggedIn);
        // check for existing session and delete it
        const existingSession = await Session.findOne({ userId: user._id })
        if (existingSession) {
            await Session.deleteOne({ userId: user._id })
        }

        // create a new session
        await Session.create({ userId: user._id })

        return res.status(200).send({
            success: true,
            message: `Welcome back ${user.firstname}`,
            user,
            accessToken,
            refreshToken
        })

    } catch (err) {
        return res.send({
            status: 400,
            message: `${err.message} Login is not working`,
        })
    }
}

async function logout(req, res) {

    try {

        const userId = req.id

        await Session.deleteMany({ userId })
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })

        return res.status(200).send({
            success: true,
            message: "User logged out successfully"
        })

    } catch (err) {
        return res.send({
            status: 400,
            message: `${err.message} Login is not working`,
        })
    }
}

async function forgotPassword(req, res) {

    try {

        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

        user.Otp = otp
        user.otpExpiry = otpExpiry

        await user.save()
        await sendOTPMail(otp, email)



        return res.status(200).send({
            success: true,
            message: "User logged out successfully"
        })

    } catch (err) {
        return res.send({
            status: 500,
            message: `${err.message} not working`,
        })
    }
}

async function verifyOTP(req, res) {

    try {

        const otp = req.body
        const email = req.params.email

        if (!otp) {
            return res.status(400).send({
                success: false,
                message: "OTP is required"
            })
        }

        const user = await User.findOne({ email })


        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email not found"
            })
        }

        if (!user.Otp || !user.otpExpiry) {

            return res.status(400).send({
                success: false,
                message: "OTP is generaded or already verified"
            })
        }

        if (user.otpExpiry < new Date()) {

            return res.status(400).send({
                success: false,
                message: "OTP has expired! Please request a new one"
            })
        }

        if (otp.otp !== user.Otp) {

            return res.status(400).send({
                success: false,
                message: "OTP is Invalid"
            })
        }

        user.Otp = null
        user.otpExpiry = null
        await user.save()

        return res.status(200).send({
            success: true,
            message: "OTP verified successfully"
        })

    } catch (err) {
        return res.send({
            status: 500,
            message: `${err.message} not working`,
        })
    }
}

async function changePassword(req, res) {

    try {

        const { newPassword, confirmPassword } = req.body
        const email = req.params.email
        console.log(`Email params value ${email}`)

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email not found"
            })
        }

        if (!newPassword || !confirmPassword) {

            return res.status(400).send({
                success: false,
                message: "All feild are required"
            })
        }

        if (newPassword !== confirmPassword) {

            return res.status(400).send({
                success: false,
                message: "Password do not match"
            })
        }

        const hash = await bcrypt.hash(newPassword, saltRounds);
        user.password = hash
        await user.save()

        return res.status(200).send({
            success: true,
            message: "Password change successfuly"
        })



    } catch (err) {
        return res.send({
            status: 500,
            message: `${err.message} not working`,
        })
    }
}

async function allUsers(req, res) {

    try {


        const users = await User.find()

        return res.status(200).send({
            success: true,
            users
        })

    } catch (err) {
        return res.send({
            status: 500,
            message: `${err.message} not working`,
        })
    }
}

async function getUserById(req, res) {

    try {


        const { userId } = req.params
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token")

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).send({
            success: true,
            user
        })

    } catch (err) {
        return res.send({
            status: 500,
            message: `${err.message} not working`,
        })
    }
}

module.exports = { register, verify, reVerify, login, logout, forgotPassword, verifyOTP, changePassword, allUsers, getUserById }