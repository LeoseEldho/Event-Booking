import cors from "cors";
import express, { json } from "express";
import "dotenv/config"
import DataBaseConnection from "./DataBase/db.js";
import router from "./Router/auth.js";
import eventRouter from './Router/events.js'

const app = express();
app.use(cors())
app.use(express.json())

DataBaseConnection()

app.use('/api', router)
app.use("/api",eventRouter)



app.get("/", (req, res) => {
    res.send("server is running")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})