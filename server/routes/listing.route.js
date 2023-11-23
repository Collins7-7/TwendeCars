import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getSingleListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyUserToken, createListing);

listingRouter.delete("/delete/:id", verifyUserToken, deleteListing);
listingRouter.put("/update/:id", verifyUserToken, updateListing);
listingRouter.get("/get/:id", getSingleListing);
listingRouter.post("/get", getListings);

export { listingRouter };
