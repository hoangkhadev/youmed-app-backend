import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    avatar_url: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    experience_years: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      trim: true,
    },
    specializations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialty",
        required: true,
      },
    ],
    bio: {
      type: String,
      trim: true,
    },
    workplace: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.virtual("schedules", {
  ref: "Schedule",
  localField: "_id",
  foreignField: "doctor",
});

doctorSchema.set("toObject", { virtuals: true });
doctorSchema.set("toJSON", { virtuals: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
