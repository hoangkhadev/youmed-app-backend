import express from "express";
import { getSpecialties } from "../controllers/specialty.controller.js";

const router = express.Router();

router.get("/", getSpecialties);

export default router;
