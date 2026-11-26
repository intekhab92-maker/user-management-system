
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credential: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend server is running successfully",
  });
});

const PORT = process.env.PORT || 5000

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});