import mongoose from "mongoose";

import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Clinic from "../models/clinic.model.js";

const clinics = [
  {
    name: "Phòng khám Hello Doctor",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756220/youmed/clinic/aepnf7liue1zdrup5dq2.png",
    address: "152/6 Thành Thái, Phường 12, Quận 10, Hồ Chí Minh",
  },
  {
    name: "Shine Clinic By TS.BS Trần Ngọc Ánh since 1987",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/o37ecwdmzvbo9fdfxorw.png",
    address: "06 Trương Quyền, Phường 6, Quận 3, Hồ Chí Minh",
  },
  {
    name: "Phòng khám Sản Phụ Khoa 13 Cao Thắng",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/mcbyxk9hwmjfn8ibieqz.png",
    address: "13 Cao Thắng, Phường 5, Quận 3, Hồ Chí Minh",
  },
  {
    name: "Phòng Khám Phụ Sản 315 Quận Thủ Đức",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/fwzmtmjs6ioq4bkpar7d.png",
    address: "175 Lê Văn Việt, Phường Hiệp Phú, Quận Thủ Đức, Hồ Chí Minh",
  },
  {
    name: "Phòng khám SIM Medical Center Tân Phú",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/jdyjmeciseoxoj852lol.png",
    address:
      "Toà nhà Richstar 2 - RS5, 239-241 đường Hòa Bình, Phường Hiệp Tân, Quận Tân Phú, Hồ Chí Minh",
  },
  {
    name: "Phòng khám Nhi Mỹ Mỹ",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/myrkecinrmisn6jsgu7e.png",
    address:
      "105/10 Nguyễn Thị Tú, Phường Bình Hưng Hòa B, Quận Bình Tân, Hồ Chí Minh",
  },
  {
    name: "Phòng Khám Nhi Đồng 315 Quận 10",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/rtkrp0llqbb0cfclezun.png",
    address: "307 Tô Hiến Thành, Phường 13, Quận 10, Hồ Chí Minh",
  },
  {
    name: "ALMA Clinic by TS.BS Trần Ngọc Ánh",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/c5l4djqj22tla8rm4bym.png",
    address: "290 Nguyễn Thị Minh Khai, Phường 5, Quận 3, Hồ Chí Minh",
  },
  {
    name: "Hệ thống tiêm chủng VNVC",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756221/youmed/clinic/ucdtcgvuktdxumifocxk.png",
    address: "Trên toàn quốc",
  },
  {
    name: "Hệ thống tiêm chủng Long Châu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748756220/youmed/clinic/kv33dku6n494wrb3edj9.png",
    address: "Trên toàn quốc",
  },
];

async function seedClinic() {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await Clinic.deleteMany({}, { session });
      console.log("✅ Old clinics removed.");

      console.log(`✅ ${clinics.length} clinics will be inserted.`);
      await Clinic.insertMany(clinics, { session });
      console.log("✅ Clinics seeded successfully.");
    });
  } catch (error) {
    console.error("❌ Error seeding clinics:", error);
    throw error;
  } finally {
    session.endSession();
  }
}

export default seedClinic;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await connectDB();
      await seedClinic();

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding clinics:", error);
      process.exit(1);
    }
  })();
}
