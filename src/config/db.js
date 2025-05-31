import mongoose from "mongoose";

import AppConfig from "./app.js";

export default async function connectDB() {
  try {
    await mongoose.connect(AppConfig.MONGO_URI);
    console.log(`✅ MongoDB connected.`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}
