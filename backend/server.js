
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    Credential: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server is Running on ${port}`);
})