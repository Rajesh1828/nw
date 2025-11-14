import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import contactRouter from "./routes/contactRoutes.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/contact", contactRouter);
app.get("/", (req, res) => res.send("Hello World 🌎"));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
