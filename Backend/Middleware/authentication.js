const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/userModels");

dotenv.config();

const authrization = async (req, res, next) => {

    try {

        const header = req.header("Authorization");
        console.log("Authorization Header:", req.headers.authorization);
        console.log("here is a header", header);

        if (!header) {
            return res.send({
                status: 400,
                message: "Authorization header missing",
            })
        }

        const token = header.split(" ")[1];

        let decoded

        try {
            decoded = jwt.verify(token, process.env.JWTSECRETKEY)
        }
        catch (error) {

            return res.send({
                status: 505,
                message: "The registration token has expired",
            })
        }

        const user = await User.findById(decoded.id)

        if (!user) {

            return res.send({
                status: 400,
                success: false,
                message: "User not found"
            })
        }
        req.id = user._id
        next();

    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err.message
        })
    }

}


module.exports = authrization