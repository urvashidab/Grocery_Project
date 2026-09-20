import express from "express";
// import dotenv from "dotenv";

const app = express();

const port = 5001;

app.get("/", (req, res) => {
  res.send("Backend is working fine");
});

// inititalize server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
