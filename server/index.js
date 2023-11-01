import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/users", authRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Invalid username or email";

  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});
