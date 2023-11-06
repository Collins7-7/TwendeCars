import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyUserToken, createListing);

export { listingRouter };
