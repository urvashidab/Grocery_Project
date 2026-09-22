import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

const port = process.env.PORT || 5001;

// landing route
app.get("/", (req, res) => {
  res.send("Backend is runnig fine");
});

// server initialize
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
