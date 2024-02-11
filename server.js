import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongodburl, port, api } from "./constant.js";
import userRouterApi from "./Routes/Api/V1/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log("Server Is Running");
    });
  })
  .catch(() => {
    console.log("MongoDB Connection Failed");
    process.exit(1);
  });

app.use(`${api}/user`, userRouterApi);
