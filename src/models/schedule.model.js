import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    sessions: [
      {
        session: {
          type: String,
          enum: ["morning", "afternoon"],
          required: true,
        },
        time_slots: [
          {
            start_time: {
              type: String,
              required: true,
            },
            end_time: {
              type: String,
              required: true,
            },
            is_booked: {
              type: Boolean,
              default: false,
            },
          },
        ],
        total_slots: {
          type: Number,
        },
        booked_slots: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 📝 Update total_slots before save to database
scheduleSchema.pre("save", function (next) {
  const totalSlots = this.sessions.reduce((acc, session) => {
    return acc + (session.time_slots ? session.time_slots.length : 0);
  }, 0);

  this.total_slots = totalSlots;

  next();
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
