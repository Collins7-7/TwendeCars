import express from "express";
import { userTest, updateUserProfile } from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const userRouter = express.Router();

userRouter.get("/test", userTest);
userRouter.post("/profile/:id", verifyUserToken, updateUserProfile);

export default userRouter;
