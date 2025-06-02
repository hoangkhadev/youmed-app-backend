import mongoose from "mongoose";

const specialtySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Specialty = mongoose.model("Specialty", specialtySchema);
export default Specialty;
