require("dotenv").config()
const cors = require("cors")
import express from "express"
import { router } from "./routes"
import sequelize from "./db"
const models = require("./models/models")
import fileUpload from 'express-fileupload'
import path from "path"


const app = express()
const PORT = process.env.PORT || 7777



app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api', router)




const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`started on ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}
start()

