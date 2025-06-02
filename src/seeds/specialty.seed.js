import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Specialty from "../models/specialty.model.js";
import mongoose from "mongoose";

const specialties = [
  {
    name: "Y học cổ truyền",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757947/youmed/specialty/jb6ohqc2cpyoju9lfflw.png",
  },
  {
    name: "Lao - bệnh phổi",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757943/youmed/specialty/wiqbcgjtcsuekykqncro.png",
  },
  {
    name: "Y học thể thao",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757947/youmed/specialty/ckbjsxwjscrvqfnuveh7.png",
  },
  {
    name: "Cơ xương khớp",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757942/youmed/specialty/gwbhfqkommeo1rrklmpr.png",
  },
  {
    name: "Sản phụ khoa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/f2ljtswdrbe9vio5kyss.png",
  },
  {
    name: "Nhãn khoa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/c4fiwhxpyvqxgdcjakjo.png",
  },
  {
    name: "Nam khoa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/bww0u1fdo9vuwurx8nmf.png",
  },
  {
    name: "Vô sinh hiếm muộn",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/zo10ophbvnjlwqrckyfh.png",
  },
  {
    name: "Ngoại tiết niệu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/yydpglkwgelubplmxzzm.png",
  },
  {
    name: "Ngoại thần kinh",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/wvsnis8b5wl1qqk22zpw.png",
  },
  {
    name: "Nội tổng quát",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757945/youmed/specialty/vo0wjhawgzdvkljjkoyk.png",
  },
  {
    name: "Ngoại niệu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/xehwdrvhdwlan8wxxsfv.png",
  },
  {
    name: "Dinh dưỡng",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757942/youmed/specialty/fjtk0dkfzkhfbfijndtz.png",
  },
  {
    name: "Tiêu hóa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/ktafz9hvarxctk5urqb0.png",
  },
  {
    name: "Nhi khoa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/r84ugx5p1zildivdgneb.png",
  },
  {
    name: "Da liễu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757942/youmed/specialty/k1t5lwfarht4ksgdw4rb.png",
  },
  {
    name: "Ngoại lồng ngực - mạch máu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/so8x92g2regh4jb097rh.png",
  },
  {
    name: "Chẩn đoán hình ảnh",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757942/youmed/specialty/kxnnzagzct5d16f9z7v9.png",
  },
  {
    name: "Ngôn ngữ trị liệu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/ee7rcyqbyltw6oylh0rp.png",
  },
  {
    name: "Răng - Hàm - Mặt",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/ntk69yq0uf0wwpnsl4er.png",
  },
  {
    name: "Nội thần kinh",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757945/youmed/specialty/jkb9e7q7uiryevevdrmz.png",
  },
  {
    name: "Tai - Mũi - Họng",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/paewofg9xwwycrjpdlrm.png",
  },
  {
    name: "Ung bướu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/ankcitzxjsmchvsjnc6f.png",
  },
  {
    name: "Tim mạch",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/ml4whswcre9nl3impxal.png",
  },
  {
    name: "Lão khoa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757943/youmed/specialty/cklnplg5kmxp3wrosale.png",
  },
  {
    name: "Chấn thương chỉnh hình",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757942/youmed/specialty/d1udhr7gm9ltmgo5szi7.png",
  },
  {
    name: "Hồi sức cấp cứu",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757943/youmed/specialty/cz2mysd2wsjtnbfusdvl.png",
  },
  {
    name: "Ngoại tổng quát",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757944/youmed/specialty/v8wf32fatp556vswdll7.png",
  },
  {
    name: "Gây mê hồi sức",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757943/youmed/specialty/akkrk8tbbiyotehswalw.png",
  },
  {
    name: "Y học dự phòng",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757947/youmed/specialty/mrjp4lonlnbywstasdmx.png",
  },
  {
    name: "Truyền nhiễm",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/jayvvb5nfoikeghj6d7v.png",
  },
  {
    name: "Nội thận",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757945/youmed/specialty/fsbq9r3gobckcrnte1kv.png",
  },
  {
    name: "Nội tiết",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757945/youmed/specialty/gozj6ynorfjevblhskvu.png",
  },
  {
    name: "Tâm thần",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/jedgmzqqn4vakyds62cu.png",
  },
  {
    name: "Hô hấp",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757943/youmed/specialty/wiqbcgjtcsuekykqncro.png",
  },
  {
    name: "Xét nghiệm",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/mauz0wqdsfadqt7zll9p.png",
  },
  {
    name: "Huyết học",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757943/youmed/specialty/kmtmzbq53b1uzwsr1icw.png",
  },
  {
    name: "Tâm lý",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/iy5hoefe61m3bsd6wnt3.png",
  },
  {
    name: "Phẩu thuật tạo hình (Thẩm mỹ)",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757946/youmed/specialty/tyqzeburmbu7px37r1vu.png",
  },
  {
    name: "Đa khoa",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757945/youmed/specialty/vo0wjhawgzdvkljjkoyk.png",
  },
  {
    name: "Phục hồi chức năng (Vật lý trị liệu)",
    image_url:
      "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748757945/youmed/specialty/jrepy12omlxdrqagjdd9.png",
  },
];

async function seedSpecialty() {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await Specialty.deleteMany({}, { session });
      console.log("✅ Old specialties removed.");

      console.log(`✅ ${specialties.length} specialties will be inserted.`);
      await Specialty.insertMany(specialties, { session });
      console.log("✅ Specialties seeded successfully.");
    });
  } catch (error) {
    console.error("❌ Error seeding specialties:", error);
    throw error;
  } finally {
    session.endSession();
  }
}

export default seedSpecialty;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await connectDB();
      await seedSpecialty();

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding specialties:", error);
      process.exit(1);
    }
  })();
}
