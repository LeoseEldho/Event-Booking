import cors from "cors";
import express, { json } from "express";
import "dotenv/config"
import DataBaseConnection from "./DataBase/db.js";
import userRouter from "./Router/auth.js";
import eventRouter from './Router/events.js'
import bookingRouter from "./Router/booking.js";

const app = express();
app.use(cors())
app.use(express.json())

DataBaseConnection()

app.use('/api', userRouter)
app.use("/api",eventRouter)
app.use("/api",bookingRouter)


app.get("/", (req, res) => {
    res.send("server is running")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})