import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .json({
        message: "User created successfully",
      })
      .status(201);
  } catch (err) {
    next(err);
  }
};

export { createUser };
