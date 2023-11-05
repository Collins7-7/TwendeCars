import express from "express";
import {
  userTest,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const userRouter = express.Router();

userRouter.get("/test", userTest);
userRouter.post("/profile/:id", verifyUserToken, updateUserProfile);
userRouter.delete("/delete/:id", verifyUserToken, deleteUser);

export default userRouter;
