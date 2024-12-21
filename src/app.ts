import express from "express";
import fs from "fs";
import path from "path";
import sequelize from "./config/database";
import { envs } from "./config/envs";
import mainRouter from "./routes";
import { passportMiddleware } from "./middlewares/passport.middleware";
import passport from "passport";
import dayjs from "dayjs";

const app = express();

app.use(express.json());
app.use(passport.initialize());
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
