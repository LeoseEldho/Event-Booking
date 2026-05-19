import cors from "cors";
import express, { json } from "express";
import dotenv from 'dotenv/config.js'
import DataBaseConnection from "./DataBase/db.js";
import router from "./Router/auth.js";

const app = express();
app.use(cors())
app.use(json())

DataBaseConnection()

router.get('/api',router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})