const express = require("express")
const router = require("./Router/routes")
const dbCon = require("./DB/DB_Connections")
const cors = require('cors')

const PORT = 3000 || process.env.PORT
const app = express()
app.use(cors());

app.use(express.json())

dbCon()
app.use("/api", router);


app.listen(PORT, ()=>{
    console.log(`server is runnig on ${PORT}`);
})