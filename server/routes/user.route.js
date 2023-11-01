import express from "express";
import { userTest } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/test", userTest);

export default userRouter;
