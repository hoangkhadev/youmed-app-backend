import jwt from "jsonwebtoken";
import AppConfig from "../config/app.js";

const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, AppConfig.JWT_SERECT, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, AppConfig.JWT_SERECT);
};

export default { generateToken, verifyToken };
