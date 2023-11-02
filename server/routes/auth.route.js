import express from "express";
import { createUser, signIn } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", createUser);
authRouter.post("/signin", signIn);

export default authRouter;
