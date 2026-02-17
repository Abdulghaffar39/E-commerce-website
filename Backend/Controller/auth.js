const userSchema = require("../DB/DB_Schema");
const bcrypt = require('bcrypt');
const saltRounds = 12; // Recommended for production

async function signUp(req, res) {
    try {

        const { name, email, password } = req.body;

        const findEmail = await userSchema.findOne({ email })

        if (findEmail) {
            res.send({
                status: 500,
                message: "Email already exist! Please try another email"
            })
        }



        bcrypt.hash(password, saltRounds, function (err, hash) {
            bcrypt.compare(password, hash, async function (err, result) {

                const userValue = { name, email, password: hash }

                const value = await new userSchema(userValue).save()

                res.send({
                    status: 200,
                    message: "Your account sccussfuly created"
                })
            });
        });


    }
    catch (err) {
        res.send({
            status: 400,
            message: "Sign is not working"
        })
    }
}

async function login(req, res) {
    try {

        const { email, password } = req.body

        const user = await userSchema.findOne({ email })

        if (!user) {

            res.send({
                message: "Invalid email"
            })
        }

        bcrypt.compare(password, user.password, function (err, result) {

            if(err){
                console.log(err);
            }
            
            if (result){

                return res.send({
                    result,
                    status: 200,
                    message: "Login Successfuly"
                })
            }


        })


    }
    catch (err) {
        res.send({
            status: 400,
            message: "Login is not working"
        })
    }
}

module.exports = { signUp, login }

