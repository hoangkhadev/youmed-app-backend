import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const users = [
  {
    full_name: "Lê Thị Minh Hồng",
    phone: "0909123001",
    email: "hongltm@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "female",
    date_of_birth: new Date("1985-06-15"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận Bình Thạnh",
      ward: "Phường 13",
      address2: "250 Nguyễn Xí",
    },
  },
  {
    full_name: "Lâm Việt Trung",
    phone: "0909123002",
    email: "trunglv@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "male",
    date_of_birth: new Date("1987-04-12"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 5",
      ward: "Phường 12",
      address2: "Phòng mạch: 53 Phạm Hữu Chí",
    },
  },
  {
    full_name: "Nguyễn Thị Thu Hà",
    phone: "0909123003",
    email: "hantt@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "female",
    date_of_birth: new Date("1990-09-28"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận Bình Tân",
      ward: "Phường Bình Trị Đông B",
      address2: "94 Đường số 1",
    },
  },
  {
    full_name: "Võ Đức Hiếu",
    phone: "0909123004",
    email: "hieuvd@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "male",
    date_of_birth: new Date("1988-02-17"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 5",
      ward: "Phường 8",
      address2: "20 Phước Hưng",
    },
  },
  {
    full_name: "Trần Quang Nam",
    phone: "0909123005",
    email: "namtq@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "male",
    date_of_birth: new Date("1991-01-05"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 5",
      ward: "Phường 10",
      address2: "8 Phan Phú Tiên",
    },
  },
  {
    full_name: "Nguyễn Bá Thắng",
    phone: "0909123006",
    email: "thangnb@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "male",
    date_of_birth: new Date("1993-12-11"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận Tân Bình",
      ward: "Phường 5",
      address2: "1237/5 Hoàng Sa",
    },
  },
  {
    full_name: "Trần Anh Tuấn",
    phone: "0909123007",
    email: "tuanta@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "male",
    date_of_birth: new Date("1989-08-20"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 11",
      ward: "Phường 3",
      address2: "24 - 26 Lạc Long Quân",
    },
  },
  {
    full_name: "Huỳnh Phan Chúc Linh",
    phone: "0909123008",
    email: "linhhpc@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "female",
    date_of_birth: new Date("1992-03-30"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 11",
      ward: "Phường 4",
      address2: "175 Trần Quý",
    },
  },
  {
    full_name: "Hoàng Thị Thu Huyền",
    phone: "0909123009",
    email: "huyenhtt@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "female",
    date_of_birth: new Date("1994-10-08"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 8",
      ward: "Phường 5",
      address2: "83 Lê Quyên",
    },
  },
  {
    full_name: "Lý Thái Lộc",
    phone: "0909123010",
    email: "loclt@gmail.com",
    password: "123456",
    role: "doctor",
    gender: "male",
    date_of_birth: new Date("1990-06-01"),
    address: {
      city: "Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Nguyễn Cư Trinh",
      address2: "286/20A Trần Hưng Đạo",
    },
  },
];

async function seedUser() {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await User.deleteMany({}, { session });
      console.log("✅ Old users removed.");

      // 📝 Hash user password before insert into database
      const hashedUsers = await Promise.all(
        users.map(async (user) => {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(user.password, salt);

          return { ...user, password: hashPassword };
        })
      );

      console.log(`✅ ${users.length} users will be inserted.`);
      await User.insertMany(hashedUsers, { session });
      console.log("✅ Users seeded successfully.");
    });
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  } finally {
    session.endSession();
  }
}

export default seedUser;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await connectDB();
      await seedUser();

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding users:", error);
      process.exit(1);
    }
  })();
}
