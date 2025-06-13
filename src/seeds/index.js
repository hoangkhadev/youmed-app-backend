import connectDB from "../config/db.js";

import seedClinic from "./clinic.seed.js";
import seedSpecialty from "./specialty.seed.js";
import seedHospital from "./hospital.seed.js";
import seedUser from "./user.seed.js";
import seedDoctor from "./doctor.seed.js";
import seedSchedule from "./schedule.seed.js";
import Appointment from "../models/appointment.model.js";
import MedicalRecord from "../models/medical_record.model.js";

async function seedAll() {
  try {
    await connectDB();

    await seedClinic();
    await seedSpecialty();
    await seedHospital();

    await seedUser();
    await seedDoctor();
    await seedSchedule();

    await MedicalRecord.deleteMany({});
    await Appointment.deleteMany({});

    console.log("✅ All seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

seedAll();
