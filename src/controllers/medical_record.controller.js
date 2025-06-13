import Appointment from "../models/appointment.model.js";
import MedicalRecord from "../models/medical_record.model.js";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import mongoose from "mongoose";

export const getRecordsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const records = await MedicalRecord.find({ doctor: doctorId })
      .populate("patient", "full_name phone")
      .populate("appointment", "datetime snapshot_time_slot")
      .sort({ createdAt: -1 });

    return res.status(200).json(records);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách phiếu khám", err);
    return res.status(500).json({
      message: "Server đang bảo trì, vui lòng thử lại sau",
    });
  }
};

export const updateRecord = async (req, res) => {
  const { appointmentId } = req.params;
  const { symptoms, diagnosis } = req.body;

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const record = await MedicalRecord.findOne({
        appointment: appointmentId,
      });

      if (!record) {
        return res.status(404).json({ message: "Phiếu khám không tồn tại." });
      }

      // Cập nhật dữ liệu
      record.symptoms = symptoms || record.symptoms;
      record.diagnosis = diagnosis || record.diagnosis;

      await record.save();

      return res.status(200).json(record);
    });
  } catch (err) {
    console.error("Lỗi khi cập nhật phiếu khám", err);
    return res.status(500).json({
      message: "Server đang bảo trì, vui lòng thử lại sau.",
    });
  } finally {
    session.endSession();
  }
};

export const getRecordsByAppointmendId = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const records = await MedicalRecord.findOne({ appointment: appointmentId })
      .populate("patient")
      .populate({
        path: "appointment",
        populate: [
          { path: "patient" },
          {
            path: "doctor",
            populate: [{ path: "user" }, { path: "specializations" }],
          },
        ],
      })
      .populate({
        path: "doctor",
        populate: [
          {
            path: "user",
          },
          {
            path: "specializations",
          },
          {
            path: "schedules",
          },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(records);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách phiếu khám", err);
    return res.status(500).json({
      message: "Server đang bảo trì, vui lòng thử lại sau",
    });
  }
};
