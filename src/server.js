import express from "express";
import cors from "cors";

import AppConfig from "./config/app.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import medicalRecordRoutes from "./routes/medical_record.routes.js";
import userRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import specialtyRoutes from "./routes/specialty.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

/* Definde Routes */
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/specialties", specialtyRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/clinics", clinicRoutes);

app.listen(AppConfig.PORT, () =>
  console.log(`✅ Server running on: ${AppConfig.APP_URL}:${AppConfig.PORT}`)
);
