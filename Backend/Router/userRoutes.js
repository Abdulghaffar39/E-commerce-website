const express = require("express");
const { register, verify, reVerify } = require("../Controller/UserController");

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/verify",  verify)
userRouter.post("/reVerify",  reVerify)


module.exports = userRouter
