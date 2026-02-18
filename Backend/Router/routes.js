const express = require("express")
const { signUp, login } = require("../Controller/auth");
const { postProduct } = require("../Controller/productController");

const router = express.Router();

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/postProduct", postProduct)



module.exports = router

