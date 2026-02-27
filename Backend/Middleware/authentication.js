const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authrization = async (req, res, next) => {

    const header = req.header("Authorization");
    console.log("Authorization Header:", req.headers.authorization);
    console.log("here is a header", header);

    if (!header) {
        return res.send({

            status: 401,
            message: "Authorization header missing",
        })
    }

    try {

        const token = header.split(" ")[1];
        jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {

            if (err) {
                return res.send({

                    status: 403,
                    message: "forbidden"
                })
            }

            req.user = decoded;
            next();
        });

    }
    catch (error) {

        return res.send({

            status: 505,
            message: "User in not authorized",
        })
    }

}


module.exports = authrization