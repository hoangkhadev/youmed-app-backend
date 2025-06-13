import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Doctor from "../models/doctor.model.js";
import Schedule from "../models/schedule.model.js";
import mongoose from "mongoose";

const morningSlots = [
  { start_time: "08:00", end_time: "08:15" },
  { start_time: "08:15", end_time: "08:30" },
  { start_time: "08:30", end_time: "08:45" },
  { start_time: "08:45", end_time: "09:00" },
];

const afternoonSlots = [
  { start_time: "17:00", end_time: "17:15" },
  { start_time: "17:15", end_time: "17:30" },
  { start_time: "17:30", end_time: "17:45" },
  { start_time: "17:45", end_time: "18:00" },
];

const totalSlotsForDay = morningSlots.length + afternoonSlots.length;

const dates = [
  {
    start: 13,
    end: 30,
  },
  {
    start: 13,
    end: 30,
  },
  {
    start: 13,
    end: 25,
  },
  {
    start: 13,
    end: 28,
  },
  {
    start: 13,
    end: 20,
  },
  {
    start: 13,
    end: 25,
  },
  {
    start: 13,
    end: 18,
  },
  {
    start: 13,
    end: 20,
  },
  {
    start: 13,
    end: 23,
  },
  {
    start: 13,
    end: 25,
  },
];

async function seedSchedule() {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await Schedule.deleteMany({}, { session });
      console.log("✅ Old schedules removed.");

      const doctors = await Doctor.find({});

      if (!doctors.length) {
        console.error("❌ No doctors found.");
        return;
      }

      const schedules = [];
      doctors.forEach((doctor, index) => {
        const range = dates[index];

        for (let day = range.start; day <= range.end; day++) {
          const date = new Date(`2025-06-${day}`);

          schedules.push({
            doctor: doctor?._id,
            date,
            total_slots: totalSlotsForDay,
            sessions: [
              {
                session: "morning",
                time_slots: morningSlots,
              },
              {
                session: "afternoon",
                time_slots: afternoonSlots,
              },
            ],
          });
        }
      });

      console.log(`✅ ${schedules.length} schedules will be inserted.`);
      await Schedule.insertMany(schedules, { session });
      console.log("✅ Schedules seeded successfully.");
    });
  } catch (error) {
    console.error("❌ Error seeding schedules:", error);
    throw error;
  } finally {
    session.endSession();
  }
}

export default seedSchedule;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await connectDB();
      await seedSchedule();

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding schedules:", error);
      process.exit(1);
    }
  })();
}
