import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

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

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: passwordRegen, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const { email, username, photo } = req.body;
    const user = await User.findOne({ email });

    console.log(user);

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedRandomPassword = bcryptjs.hashSync(randomPassword, 10);

      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        avatar: req.body.photo,
        password: hashedRandomPassword,
      });

      await newUser.save();

      const { password: notwantedPassword, ...rest } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export { createUser, signIn, googleAuth };
