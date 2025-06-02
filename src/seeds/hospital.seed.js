import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Hospital from "../models/hospital.model.js";
import mongoose from "mongoose";

const hospitals = [
  {
    name: "Bệnh viện Răng Hàm Mặt TP.HCM",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764369/youmed/hospital/zyxp9qwg6rr4vtrqxizb.png",
    address: "263-265 Trần Hưng Đạo, Phường Cô Giang, Quận 1, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Y Học Cổ Truyền TP.HCM",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764369/youmed/hospital/lrvwnf0hczwui4mhht8o.png",
    address: "179 Nam Kỳ Khởi Nghĩa, Phường 7, Quận 3, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Lê Văn Thịnh",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764368/youmed/hospital/hgkbqf4qpk7yj7z0xrdo.png",
    address:
      "130 Lê Văn Thịnh , Phường Bình Trưng Tây, Quận Thủ Đức, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Quận 4",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764368/youmed/hospital/mjaeshp3rb2myigprjke.png",
    address: "65 Bến Vân Đồn, Phường 12, Quận 4, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Quân Y 175",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764369/youmed/hospital/dveisw4wfgpnhbnhp1xy.png",
    address: "786 Nguyễn Kiệm, Phường 3, Quận Gò Vấp, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Ung Bướu TPHCM",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764369/youmed/hospital/vxrnw821qy5d2vpv7wzo.png",
    address: "47 Nguyễn Huy Lượng, Phường 14, Quận Bình Thạnh, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Tai Mũi Họng TPHCM",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764369/youmed/hospital/dfarxyucaty6od5ictml.png",
    address: "153-155-157 Trần Quốc Thảo, Phường 9, Quận 3, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Bình Tân",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764368/youmed/hospital/wz8nmez7tnixx3t803g2.png",
    address:
      "809 Hương Lộ 2, Phường Bình Trị Đông A, Quận Bình Tân, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện An Bình",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764368/youmed/hospital/jaefdxdwvrdqwnmiltcj.png",
    address: "146 An Binh, Phường 7, Quận 5, Hồ Chí Minh",
  },
  {
    name: "Bệnh viện Huyện Nhà Bè",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748764368/youmed/hospital/a9nveoyptjvym0aoozoh.png",
    address:
      "281A Lê Văn Lương, Ấp 3, Xã Phước Kiển, Huyện Nhà Bè, Hồ Chí Minh",
  },
];

async function seedHospital() {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await Hospital.deleteMany({}, { session });
      console.log("✅ Old hospitals removed.");

      console.log(`✅ ${hospitals.length} hospitals will be inserted.`);
      await Hospital.insertMany(hospitals, { session });
      console.log("✅ Hospitals seeded successfully.");
    });
  } catch (error) {
    console.error("❌ Error seeding hospitals:", error);
    throw error;
  } finally {
    session.endSession();
  }
}

export default seedHospital;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await connectDB();
      await seedHospital();

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding clinics:", error);
      process.exit(1);
    }
  })();
}
