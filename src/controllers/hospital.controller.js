import Hospital from "../models/hospital.model.js";

export const getHospitals = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const hospitals = await Hospital.find().limit(limit);

    return res.status(200).json(hospitals);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách specialties:", err);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};
