import express from "express";
import {
  createUser,
  signIn,
  googleAuth,
  signOut,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", createUser);
authRouter.post("/signin", signIn);
authRouter.post("/google", googleAuth);
authRouter.get("/logout", signOut);

export default authRouter;
