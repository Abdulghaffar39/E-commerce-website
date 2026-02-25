const express = require("express")
const { signUp, login } = require("../Controller/auth");
const { postProduct, getProduct, updateProduct, deleteProduct } = require("../Controller/productController");

const router = express.Router();

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/postProduct", postProduct)
router.get("/getProduct", getProduct)
router.put(`/updateProduct/:id`, updateProduct)
router.delete("/deleteProduct/:id", deleteProduct)



module.exports = router

