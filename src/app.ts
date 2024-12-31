import express, { Application } from "express";
import "reflect-metadata";
import fs from "fs";
import path from "path";
import sequelize from "./config/database";
import { envs } from "./config/envs";
import mainRouter from "./routes";
import { passportMiddleware } from "./middlewares/passport.middleware";
import passport from "passport";
import dayjs from "dayjs";
import cors from "cors";

const app: Application = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(passport.initialize());
app.use(cors(corsOptions));
app.use("/api", mainRouter);

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/healthz", passportMiddleware, (req, res) => {
  res.status(200).send("Server is running");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(envs.PORT, () => {
  console.log("Server is running on port 3000");
});
