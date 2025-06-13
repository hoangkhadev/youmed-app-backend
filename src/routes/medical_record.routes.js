import express from "express";
const router = express.Router();

import {
  getRecordsByDoctor,
  updateRecord,
  getRecordsByAppointmendId,
} from "../controllers/medical_record.controller.js";

router.get("/doctor/:doctorId", getRecordsByDoctor);
router.put("/:appointmentId", updateRecord);
router.get("/:appointmentId/user", getRecordsByAppointmendId);

export default router;
