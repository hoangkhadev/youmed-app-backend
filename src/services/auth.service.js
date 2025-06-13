import User from "../models/user.model.js";
import jwt from "../utils/jwt.js";

export const register = async (data) => {
  const { phone } = data;
  const phoneExist = await User.findOne({ phone });
  if (phoneExist) {
    throw new Error(`Bạn đã có tài khoản với số điện thoại "${phone}"`);
  }

  const user = new User(data);
  await user.save();
  const userWithoutPassword = await User.findById(user._id).select("-password");

  const access_token = jwt.generateToken({ id: user._id, role: user.role });

  return { user: userWithoutPassword, access_token };
};

export const login = async ({ phone, password }) => {
  const user = await User.findOne({ phone });
  if (!user) throw new Error("Số điện thoại hoặc mật khẩu không đúng");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Số điện thoại hoặc mật khẩu không đúng");

  const userWithoutPassword = await User.findById(user._id)
    .select("-password")
    .lean();
  const access_token = jwt.generateToken({ id: user._id, role: user._role });
  return { user: userWithoutPassword, access_token };
};
