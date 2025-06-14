import User from "../models/user.model.js";
import Specialty from "../models/specialty.model.js";
import Schedule from "../models/schedule.model.js";
import Doctor from "../models/doctor.model.js";

export const getDoctors = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.q?.trim() || "";
  try {
    const doctors = await Doctor.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "specialties",
          localField: "specializations",
          foreignField: "_id",
          as: "specializations",
        },
      },

      ...(search
        ? [
            {
              $match: {
                $or: [
                  { "user.full_name": { $regex: search, $options: "i" } },
                  { "specializations.name": { $regex: search, $options: "i" } },
                ],
              },
            },
          ]
        : []),

      { $limit: limit },
    ]);

    return res.status(200).json(doctors);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách doctors:", err);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};

export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id)
      .populate("user")
      .populate("specializations")
      .populate("schedules");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
