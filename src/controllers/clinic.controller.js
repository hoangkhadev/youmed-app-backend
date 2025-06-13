import Clinic from "../models/clinic.model.js";

export const getClinics = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const clinics = await Clinic.find().limit(limit);
    return res.status(200).json(clinics);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách clinics:", err);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};
