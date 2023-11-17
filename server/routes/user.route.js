import express from "express";
import {
  userTest,
  updateUserProfile,
  deleteUser,
  getUserListings,
  // getOneUserListing,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const userRouter = express.Router();

userRouter.get("/test", userTest);
userRouter.post("/profile/:id", verifyUserToken, updateUserProfile);
userRouter.delete("/delete/:id", verifyUserToken, deleteUser);
userRouter.get("/listings/:id", verifyUserToken, getUserListings);
// userRouter.get("/listing/:id", verifyUserToken, getOneUserListing);

export default userRouter;
