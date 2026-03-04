const express = require("express");
const { register, verify, reVerify, login, logout, forgotPassword } = require("../Controller/UserController");
const authrization = require("../Middleware/authentication");

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/verify",  verify)
userRouter.post("/reVerify",  reVerify)
userRouter.post("/login",  login)
userRouter.post("/logout", authrization,  logout)
userRouter.post("/forgotPassword",  forgotPassword)


module.exports = userRouter
