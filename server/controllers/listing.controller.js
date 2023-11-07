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

//// AS a christian i'd say,
// we humans are imperfect and limited in our knowledge and we'll always be limited, and we'll always depend on faith.
/// we don't understand alot and all that we understand has been through studying what already exists.
//We as humans possess many cognitive abilities, and it's easy to assume that we were created by a being that thinks, a being that's orderly,
// only that that being is better than us in every single way possible,
// this means we'll never ever understand that being(also why we need faith).
// The Bible says in Isaiah 55: 8-9; “For my thoughts are not your thoughts,
// neither are your ways my ways,”
//declares the Lord.
// 9 “As the heavens are higher than the earth,
// so are my ways higher than your ways
// and my thoughts than your thoughts.

//
//
///
