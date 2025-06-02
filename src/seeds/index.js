import connectDB from "../config/db.js";

import seedUser from "./user.seed.js";
import seedClinic from "./clinic.seed.js";
import seedSpecialty from "./specialty.seed.js";
import seedHospital from "./hospital.seed.js";
import seedDoctor from "./doctor.seed.js";
import seedSchedule from "./schedule.seed.js";

async function seedAll() {
  try {
    await connectDB();

    await seedUser();
    await seedClinic();
    await seedSpecialty();
    await seedHospital();
    await seedDoctor();
    await seedSchedule();

    console.log("✅ All seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

seedAll();
