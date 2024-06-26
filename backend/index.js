import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import cookieParser from "cookie-parser";
import { TeamUser } from "./models/user.model.js";
import teamMemberRoutes from "./routes/teamMember.route.js"

dotenv.config();

mongoose
  .connect("mongodb+srv://aaryang0605:12343000@tracify.bwaowhq.mongodb.net/tracify?retryWrites=true&w=majority&appName=Tracify")
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json()); //Allows JSON as the input for our backend

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/teamuser", teamMemberRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
