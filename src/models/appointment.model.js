import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    datetime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "comfirmed", "cancelled", "done"],
      default: "pending",
    },
    reson: {
      type: String,
      required: true,
    },
    snapshot_time_slot: {
      session: {
        type: String,
        enum: ["morning", "afternoon"],
        required: true,
      },
      start_time: {
        type: String,
        required: true,
      },
      end_time: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
