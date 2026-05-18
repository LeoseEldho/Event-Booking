import cors from "cors";
import express, { json } from "express";
import dotenv from 'dotenv/config.js'

const app = express();
app.use(cors())
app.use(json())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})