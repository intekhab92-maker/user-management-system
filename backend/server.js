
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-7qme.onrender.com",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)



const PORT = process.env.PORT || 5000

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
