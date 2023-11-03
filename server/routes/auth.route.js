import express from "express";
import {
  createUser,
  signIn,
  googleAuth,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", createUser);
authRouter.post("/signin", signIn);
authRouter.post("/google", googleAuth);

export default authRouter;
