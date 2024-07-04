import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";

const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);

export default authrouter;
