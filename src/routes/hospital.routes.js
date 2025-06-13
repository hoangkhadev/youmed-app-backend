import express from "express";
import { getHospitals } from "../controllers/hospital.controller.js";

const router = express.Router();

router.get("/", getHospitals);

export default router;
