import express from "express";
import cors from "cors";

import AppConfig from "./config/app.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.listen(AppConfig.PORT, () =>
  console.log(`✅ Server running on: ${AppConfig.APP_URL}:${AppConfig.PORT}`)
);
