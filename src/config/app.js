import dotenv from "dotenv";
dotenv.config();

export default class AppConfig {
  static PORT = Number(process.env.PORT) || 8080;
  static APP_URL = process.env.APP_URL || "http://localhost";
  static MONGO_URI = process.env.MONGO_URI;
  static JWT_SERECT = process.env.JWT_SERECT;
}
