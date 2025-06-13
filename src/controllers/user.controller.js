import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      return res
        .status(400)
        .json({ message: "Không thể cập nhật mật khẩu ở đây" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
    return res
      .status(500)
      .json({ message: "Server đang bảo trì, vui lòng thử lại sau" });
  }
};
