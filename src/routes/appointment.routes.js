import express from "express";
const router = express.Router();

import {
  createAppointment,
  getAppointmentsByDoctor,
  updateAppointmentStatus,
  getAppointmentDetail,
  getAppointmentsByUser,
} from "../controllers/appointment.controller.js";

router.get("/:doctorId/doctor", getAppointmentsByDoctor);
router.get("/:userId/user", getAppointmentsByUser);
router.post("/", createAppointment);
router.put("/:id/status", updateAppointmentStatus);
router.get("/:id/detail", getAppointmentDetail);

export default router;
