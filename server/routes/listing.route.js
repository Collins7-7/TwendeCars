import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyUserToken, createListing);

listingRouter.delete("/delete/:id", verifyUserToken, deleteListing);

export { listingRouter };
