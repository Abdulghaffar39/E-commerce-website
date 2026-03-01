const mongoose = require("mongoose");

const { Schema } = mongoose


const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    ProfilePicPublicId: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    token: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    Otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    phoneNo: {
        type: String
    },

}, { timestamps: true })


const User = mongoose.model("User", userSchema)
module.exports = User
