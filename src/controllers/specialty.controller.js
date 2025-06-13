import Specialty from "../models/specialty.model.js";

export const getSpecialties = async (req, res) => {
  try {
    const specialty = await Specialty.find();

    return res.status(200).json(specialty);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách specialties:", err);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};
