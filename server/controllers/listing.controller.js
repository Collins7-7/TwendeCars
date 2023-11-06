import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    next(errorHandler(401, "Bad request"));
  }
};

export { createListing };
