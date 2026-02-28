const User = require("../DB/UserModels")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const verifyEmail = require("../emailVerify/verifyEmail");
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


module.exports = { register }