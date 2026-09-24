import express from "express";
import { login, logout, register } from "../controllers/authControllers.js";

const authRoute = express.Router();

// register
authRoute.post("/register", register);

// login
authRoute.post("/login", login);

//logout
authRoute.post("/logout", logout);

export default authRoute;
