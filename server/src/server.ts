import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "../routes/authRoutes.js";

const app = express();

const port = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// landing route
app.get("/", (req, res) => {
  res.send("Backend is running fine");
});

// routes
app.use("/api/auth", authRoute);

// server initialize
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
