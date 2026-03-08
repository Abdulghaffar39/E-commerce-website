const express = require("express");
const { register, verify, reVerify, login, logout, forgotPassword, verifyOTP, changePassword, allUsers, getUserById } = require("../Controller/UserController");
const { authrization, isAdmin } = require("../Middleware/authentication");
const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/verify", verify)
userRouter.post("/reVerify", reVerify)
userRouter.post("/login", login)
userRouter.post("/logout", authrization, logout)
userRouter.post("/forgotPassword", forgotPassword)
userRouter.post("/verifyOTP/:email", verifyOTP)
userRouter.post("/changePassword/:email", changePassword)
userRouter.get("/allUsers", authrization, isAdmin, allUsers)
userRouter.get("/getUserById/:userId", getUserById)


module.exports = userRouter
