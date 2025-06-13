import jwt from "../utils/jwt.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import Specialty from "../models/specialty.model.js";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { phone } = req.body;
      const phoneExist = await User.findOne({ phone });
      if (phoneExist) {
        return res.status(400).json({
          message: `Bạn đã có tài khoản với số điện thoại "${phone}"`,
        });
      }

      const newUser = new User(req.body);
      await newUser.save();
      const user = await User.findById(newUser._id).lean();
      const access_token = jwt.generateToken({ id: user._id, role: user.role });

      return res.status(201).json({ user, access_token });
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký tài khoản user:", error);

    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  } finally {
    session.endSession();
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone }).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ message: "Số điện thoại hoặc mật khẩu không đúng" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Số điện thoại hoặc mật khẩu không đúng" });

    const access_token = jwt.generateToken({ id: user._id, role: user._role });

    const userObj = user.toObject();

    delete userObj.password;

    if (user.role === "doctor") {
      const doctorInfo = await Doctor.findOne({ user: user._id })
        .populate("specializations")
        .lean();

      return res.json({
        user: { ...userObj, doctor: doctorInfo },
        access_token,
      });
    }

    return res.status(200).json({ user: userObj, access_token });
  } catch (error) {
    console.error("Lỗi khi đăng nhập user:", error);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userReq = req.user;
    const user = await User.findById(userReq.id).lean();
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    if (user.role === "doctor") {
      const doctorInfo = await Doctor.findOne({ user: user._id })
        .populate("specializations")
        .lean();

      if (!doctorInfo) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy thông tin bác sĩ" });
      }

      return res.json({ ...user, doctor: doctorInfo });
    }
    return res.json(user);
  } catch (err) {
    console.error("Lỗi khi lấy thông tin user:", err);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};
