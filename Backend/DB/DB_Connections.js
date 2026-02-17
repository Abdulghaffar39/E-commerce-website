const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();


async function dbCon() {

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Database Connected"))
            .catch((err) => console.log(`Connection Feild ${err}`));

        mongoose.connection.on("connected", () => console.log("DATABASE CONNECTED SUCCESSFULLY"))
        mongoose.connection.on("disconnected", () => console.log("DATABASE CONNECTED TERMINATED"))


    }
    catch (err) {
        res.send({
            status: 400,
            message: "MongoDB URL Error"
        })
    }
}

module.exports = dbCon

