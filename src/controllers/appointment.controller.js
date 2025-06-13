import mongoose from "mongoose";

import Schedule from "../models/schedule.model.js";
import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import MedicalRecord from "../models/medical_record.model.js";

export const createAppointment = async (req, res) => {
  const { patient, doctor, datetime, reason, snapshot_time_slot } = req.body;

  if (!patient || !doctor || !datetime || !reason || !snapshot_time_slot) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  const date = new Date(datetime);
  try {
    const schedule = await Schedule.findOne({
      doctor,
      date,
      "sessions.session": snapshot_time_slot.session,
      "sessions.time_slots.start_time": snapshot_time_slot.start_time,
      "sessions.time_slots.end_time": snapshot_time_slot.end_time,
    }).session(session);

    if (!schedule) {
      return res.status(404).json({ message: "Time slot not available." });
    }

    // Cập nhật trạng thái của slot
    let slotBooked = false;
    for (const session of schedule.sessions) {
      if (session.session === snapshot_time_slot.session) {
        for (const slot of session.time_slots) {
          if (
            slot.start_time === snapshot_time_slot.start_time &&
            slot.end_time === snapshot_time_slot.end_time
          ) {
            if (slot.is_booked) {
              return res
                .status(400)
                .json({ message: "This time slot is already booked." });
            }
            slot.is_booked = true;
            session.booked_slots += 1;
            slotBooked = true;
          }
        }
      }
    }

    if (!slotBooked) {
      return res.status(400).json({ message: "Unable to book slot." });
    }

    const scheduleSave = await schedule.save({ session });

    // const appointmentCount = await Appointment.countDocuments({
    //   doctor,
    //   datetime: date,
    // }).session(session);

    const bookedSlot = await scheduleSave.sessions.find(
      (s) => s.session === snapshot_time_slot.session
    ).booked_slots;

    const [appointment] = await Appointment.create(
      [
        {
          patient,
          doctor,
          datetime,
          reason,
          snapshot_time_slot,
          appointment_number: bookedSlot,
        },
      ],
      { session }
    );

    await MedicalRecord.create(
      [
        {
          patient,
          doctor,
          appointment: appointment._id,
          symptoms: "",
          diagnosis: "",
        },
      ],
      { session }
    );

    const appointmentData = await Appointment.findById(appointment._id)
      .populate("patient")
      .populate({
        path: "doctor",
        populate: [
          {
            path: "user",
          },
          {
            path: "specializations",
          },
        ],
      })
      .session(session)
      .lean();

    await session.commitTransaction();
    return res.status(201).json(appointmentData);
  } catch (error) {
    await session.abortTransaction();
    console.error("Lỗi khi lấy đặt lịch hẹn:", error);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  } finally {
    session.endSession();
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid or missing doctor ID." });
    }

    const appointments = await Appointment.find({ doctor: doctorId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Lỗi khi lấy lịch hẹn theo bác sĩ:", error);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed", "done", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ." });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const appointment = await Appointment.findById(id).session(session);

    if (!appointment) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Lịch hẹn không tồn tại." });
    }

    // Nếu status là cancelled thì mở lại slot
    if (status === "cancelled") {
      const schedule = await Schedule.findOne({
        doctor: appointment.doctor,
        date: appointment.datetime,
      }).session(session);

      if (!schedule) {
        await session.abortTransaction();
        return res
          .status(404)
          .json({ message: "Không tìm thấy lịch của bác sĩ." });
      }

      let slotRestored = false;
      for (const sess of schedule.sessions) {
        if (sess.session === appointment.snapshot_time_slot.session) {
          for (const slot of sess.time_slots) {
            if (
              slot.start_time === appointment.snapshot_time_slot.start_time &&
              slot.end_time === appointment.snapshot_time_slot.end_time
            ) {
              if (!slot.is_booked) {
                await session.abortTransaction();
                return res
                  .status(400)
                  .json({ message: "Slot đã trống từ trước." });
              }
              slot.is_booked = false;
              sess.booked_slots = Math.max(sess.booked_slots - 1, 0);
              slotRestored = true;
            }
          }
        }
      }

      if (!slotRestored) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ message: "Không tìm thấy slot để cập nhật." });
      }

      await schedule.save({ session });
    }

    appointment.status = status;
    await appointment.save({ session });

    await session.commitTransaction();
    return res.json(appointment);
  } catch (err) {
    await session.abortTransaction();
    console.error("Lỗi cập nhật trạng thái:", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi máy chủ." });
  } finally {
    session.endSession();
  }
};

export const getAppointmentDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id)
      .populate("patient")
      .populate({
        path: "doctor",
        populate: [
          {
            path: "user",
          },
          {
            path: "specializations",
          },
        ],
      })
      .lean();

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn." });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết lịch hẹn:", error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau." });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing user ID." });
    }

    const appointments = await Appointment.find({ patient: userId })
      .populate("patient")
      .populate({
        path: "doctor",
        populate: [
          {
            path: "user",
          },
          { path: "specializations" },
        ],
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Lỗi khi lấy lịch hẹn theo user:", error);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};
