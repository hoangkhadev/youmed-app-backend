import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import Specialty from "../models/specialty.model.js";
import mongoose from "mongoose";

const doctorsData = {
  avatar_urls: [
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774724/youmed/doctor/gpgdsfo5janfduuikp7y.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774717/youmed/doctor/pp0rmcfjnye5gtawg18y.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774748/youmed/doctor/py3izfju5enzclgswwk0.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774718/youmed/doctor/mr6zvz1jth0cmzdkzm8v.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774706/youmed/doctor/pbt8foqgsje5z8r9yxqz.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774706/youmed/doctor/lemmv7xtpjqzqdaei9xr.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774731/youmed/doctor/teg9kqq2ftmwaghwcdvg.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774730/youmed/doctor/l99qm4no8d5iyl5h8ogo.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774722/youmed/doctor/fbilzvzjv9puk7ygvsi5.png",
    "https://res.cloudinary.com/dmkjrgzpj/image/upload/v1748774722/youmed/doctor/im8wwjhbvxmdvqxtn3ne.png",
  ],
  titles: [
    "BS. CK2",
    "PGS. TS. BS",
    "BS. CK2",
    "BS. CK2",
    "PGS. TS. BS",
    "TS. BS",
    "TS. BS",
    "BS. CK2",
    "ThS. BS. CK2",
    "BS. CK2",
  ],
  experienceYears: [25, 25, 36, 27, 25, 29, 36, 25, 26, 35],
  positions: [
    "Phó Giám Đốc Bệnh Viên Nhi Đồng 2",
    "Phó Giám Đốc Bệnh Viện Chợ Rẫy",
    "Phó Giám Đốc Bệnh Viện Nhi Đồng Thành Phố",
    null,
    "Trưởng Khoa Nội Tiết Bệnh Viện Đại Học Y Dược TP.HCM",
    "Trưởng Trung Tâm Khoa Học Thần Kinh, Trưởng khoa Thần Kinh, Trưởng Đơn Vị Đột Quỵ, BV Đại Học Y Dược TP.HCM",
    null,
    null,
    null,
    "Trưởng Khoa Hiếm Muộn BV Hùng Vương",
  ],
  specializations: [
    ["Nhi khoa"],
    ["Tiêu hóa"],
    ["Nhi khoa"],
    ["Ung bướu"],
    ["Nội tiết"],
    ["Nội thần kinh"],
    ["Nhi khoa"],
    ["Cơ xương khớp"],
    ["Sản phụ khoa", "Ung bướu"],
    ["Sản phụ khoa", "Vô sinh hiếm muộn"],
  ],
  workplaces: [
    "Bệnh viện Nhi Đồng 2",
    "Bệnh viện Chợ Rẫy",
    "Bệnh viện Nhi Đồng Thành phố",
    "Bệnh viện Ung Bướu TP. HCM",
    "Bệnh viện Trường Đại học Y Dược",
    "Bệnh viện Trường Đại học Y Dược",
    "Bệnh viện Nhi Đồng 1",
    "Bệnh viện Chợ Rẫy",
    null,
    "Bệnh viện Hùng Vương",
  ],
  bios: [
    `<p>B&aacute;c sĩ Chuy&ecirc;n khoa II L&ecirc; Thị Minh Hồng hiện đang l&agrave; Ph&oacute; Gi&aacute;m đốc Bệnh viện Nhi Đồng 2. B&aacute;c sĩ trực tiếp kh&aacute;m bệnh theo y&ecirc;u cầu chất lượng cao tại Bệnh Viện Nhi Đồng 2 v&agrave; ph&ograve;ng kh&aacute;m Nhi khoa (250 Nguyễn X&iacute;, Phường 13, B&igrave;nh Thạnh, TP.HCM).</p><p><strong>C&aacute;c dịch vụ của ph&ograve;ng kh&aacute;m Nhi khoa B&aacute;c sĩ L&ecirc; Thị Minh Hồng:<strong></p><ul><li>Kh&aacute;m v&agrave; điều trị c&aacute;c bệnh l&yacute; Nhi khoa: ti&ecirc;u h&oacute;a, h&ocirc; hấp, thận, nhiễm, dị ứng, tai mũi họng, sơ sinh,&hellip;</li><li>Tư vấn Nhi khoa: sức khỏe, ch&iacute;ch ngừa, dinh dưỡng, biếng ăn, ph&aacute;t triển t&acirc;m thần vận động,&hellip;</li><li>X&ocirc;ng kh&iacute; dung.</li><li>Vật l&yacute; trị liệu h&ocirc; hấp.</li><li>Thay băng, cắt chỉ,&hellip;</li></ul>`,
    `<p>Ph&oacute; Gi&aacute;o sư, Tiến sĩ, B&aacute;c sĩ L&acirc;m Việt Trung đ&atilde; c&oacute; hơn 20 năm kinh nghiệm trong lĩnh vực Ti&ecirc;u h&oacute;a.</p><p>L&agrave; một b&aacute;c sĩ giỏi, c&oacute; bề d&agrave;y kinh nghiệm cũng như chuy&ecirc;n m&ocirc;n cao, PGS.TS.BS L&acirc;m Việt Trung hiện l&agrave; Trưởng khoa Ngoại ti&ecirc;u h&oacute;a - Bệnh viện Chợ Rẫy v&agrave; hiện đang giữ chức vụ Ph&oacute; Gi&aacute;m Đốc Bệnh Viện Chợ Rẫy.</p>`,
    `<p><strong>Người b&aacute;c sĩ đến với bệnh nh&acirc;n kh&ocirc;ng chỉ bằng chuy&ecirc;n m&ocirc;n, m&agrave; c&ograve;n bằng cả tấm l&ograve;ng.</strong></p><p>Với gần 33 năm l&agrave; b&aacute;c sĩ tại c&aacute;c bệnh viện nhi lớn của TP.HCM, BSCKII. Nguyễn Thị Thu H&agrave; c&oacute; nhiều kinh nghiệm trong chẩn đo&aacute;n v&agrave; điều trị bệnh l&yacute; nhi khoa, đặc biệt c&oacute; tr&ecirc;n 20 năm l&agrave;m việc trong lĩnh vực Ti&ecirc;u h&oacute;a nhi.</p><p>Việc tiếp x&uacute;c h&agrave;ng ng&agrave;y, trong nhiều năm liền với c&aacute;c bệnh nhi gi&uacute;p B&aacute;c sĩ Thu H&agrave; thấu hiểu được những biểu hiện đau, kh&oacute; chịu, bất thường&hellip; gi&aacute;n tiếp qua tiếng kh&oacute;c, vẻ mặt, th&aacute;i độ giao tiếp của trẻ. Đồng thời hiểu v&agrave; th&ocirc;ng cảm với những băn khoăn, lo lắng của &ocirc;ng b&agrave;, cha mẹ của trẻ.</p><p>&ldquo;Trẻ em kh&ocirc;ng phải l&agrave; một người lớn thu nhỏ&rdquo; do vậy điều trị bệnh ở trẻ c&oacute; những nguy&ecirc;n tắc ri&ecirc;ng, hạn chế sử dụng một số loại thuốc c&oacute; thể g&acirc;y hại cho n&atilde;o, gan, thận&hellip; của&nbsp;trẻ. Bởi v&igrave; tất cả c&aacute;c cơ quan của trẻ đang tiếp tục ph&aacute;t triển v&agrave; trưởng th&agrave;nh về chức năng. Thuốc sử dụng kh&ocirc;ng ph&ugrave; hợp c&oacute; thể g&acirc;y n&ecirc;n ảnh hưởng đến chức năng c&aacute;c cơ quan kh&ocirc;ng hồi phục.</p><p>B&aacute;c sĩ Thu H&agrave; lu&ocirc;n t&acirc;m niệm &ldquo;Trẻ em c&ograve;n một qu&aacute; tr&igrave;nh h&agrave;ng chục năm để ph&aacute;t triển v&agrave; trưởng th&agrave;nh, n&ecirc;n mọi sự can thiệp cần phải được c&acirc;n nhắc thật cẩn trọng để trẻ trở th&agrave;nh một người lớn khỏe mạnh cả về thể chất v&agrave; tinh thần&rdquo;.</p><p>Điều trị &ldquo;trẻ bệnh&rdquo; chứ kh&ocirc;ng phải chỉ điều trị &ldquo;bệnh l&yacute; của trẻ&rdquo;, kh&ocirc;ng chỉ cần thuốc m&agrave; c&ograve;n phải c&oacute; những lời tư vấn, động vi&ecirc;n, giải th&iacute;ch cặn kẽ để trẻ v&agrave; th&acirc;n nh&acirc;n hiểu r&otilde; về căn bệnh v&agrave; y&ecirc;n t&acirc;m điều trị. Nhất l&agrave; biết c&aacute;ch theo d&otilde;i c&aacute;c dấu hiệu nguy hiểm cần t&aacute;i kh&aacute;m hoặc đưa đến bệnh viện kịp thời. Đặc biệt trẻ v&agrave; th&acirc;n nh&acirc;n cần được tư vấn để hiểu r&otilde; v&agrave; biết c&aacute;ch ph&ograve;ng tr&aacute;nh c&aacute;c biến chứng cũng như t&aacute;i ph&aacute;t của căn bệnh.</p>`,
    `<p>Thầy thuốc ưu t&uacute; - B&aacute;c sĩ Chuy&ecirc;n khoa II V&otilde; Đức Hiếu l&agrave; chuy&ecirc;n gia với gần 25 năm kinh nghiệm về chẩn đo&aacute;n v&agrave; điều trị nội khoa ung thư của Bệnh viện Ung bướu TP.HCM.</p><p>B&aacute;c sĩ V&otilde; Đức Hiếu c&oacute; rất nhiều kinh nghiệm về tư vấn ph&ograve;ng ngừa, tầm so&aacute;t ph&aacute;t hiện sớm, chẩn đo&aacute;n ch&iacute;nh x&aacute;c v&agrave; hướng dẫn điều trị ung thư, nhất l&agrave; trong điều trị ung thư v&uacute;, ung thư đường ti&ecirc;u h&oacute;a, bệnh l&yacute; tuyến gi&aacute;p,...</p><p>Hiện tại, B&aacute;c sĩ V&otilde; Đức Hiếu l&agrave; Ph&oacute; Gi&aacute;m đốc Bệnh viện Ung bướu, Tổng thư k&yacute; Hội Ung thư TP.HCM, Uỷ vi&ecirc;n BCH Hội Ung thư Việt nam, Uỷ vi&ecirc;n BCH Hội Miễn dịch trị liệu ung thư Việt nam.</p><p>Ngo&agrave;i ra, B&aacute;c sĩ Chuy&ecirc;n khoa II V&otilde; Đức Hiếu thường được mời với vai tr&ograve; chuy&ecirc;n gia chủ tọa, b&aacute;o c&aacute;o vi&ecirc;n c&aacute;c chương tr&igrave;nh Hội thảo khoa học về những tiến bộ trong chẩn đo&aacute;n v&agrave; điều trị ung thư. B&aacute;c sĩ c&ograve;n l&agrave; t&aacute;c giả, đồng t&aacute;c giả nhiều đề t&agrave;i nghi&ecirc;n cứu khoa học cấp cơ sở, cấp th&agrave;nh phố về ph&ograve;ng ngừa - điều trị ung thư.</p>`,
    `<p><strong>Ph&oacute; gi&aacute;o sư, Tiến sĩ, B&aacute;c sĩ Trần Quang Nam</strong>&nbsp;hiện đang l&agrave; Trưởng khoa Nội Tiết bệnh viện Đại học Y Dược TP.HCM, Ph&oacute; Trưởng Bộ m&ocirc;n Nội tiết tại Đại học Y Dược TP.HCM. B&aacute;c sĩ c&oacute; nhiều năm kinh nghiệm trong việc chuy&ecirc;n kh&aacute;m v&agrave; điều trị c&aacute;c bệnh như đ&aacute;i th&aacute;o đường, bệnh bướu cổ, bệnh nội tiết v&agrave; c&aacute;c bệnh nội khoa.</p>`,
    `<p>Tiến sĩ, B&aacute;c sĩ Nguyễn B&aacute; Thắng hiện l&agrave; Trưởng khoa Thần kinh - Bệnh viện Đại học Y Dược TP.HCM, Ph&oacute; trưởng bộ m&ocirc;n Thần Kinh - Đại Học Y Dược TP Hồ Ch&iacute; Minh.</p><p>Ph&ograve;ng mạch của Tiến sĩ, B&aacute;c sĩ Nguyễn B&aacute; Thắng chuy&ecirc;n kh&aacute;m v&agrave; điều trị c&aacute;c bệnh về nội khoa - t&acirc;m thần kinh như: trầm cảm, rối loạn t&acirc;m thần, &aacute;c mộng, đ&aacute;i dầm, lo &acirc;u, nhớ k&eacute;m, &aacute;m ảnh, suy nhược thần kinh, mất ngủ, kh&oacute; tập trung, rối loạn thần kinh thực vật, rối loạn ti&ecirc;u h&oacute;a, đau thần kinh tọa, động kinh, đau nhức đầu, ch&oacute;ng mặt,&hellip;</p>`,
    `<p><strong>TS.BS Trần Anh Tuấn</strong>&nbsp;với hơn 30 năm kinh nghiệm trong thăm kh&aacute;m v&agrave; điều trị trong lĩnh vực chuy&ecirc;n khoa Nhi.</p><p>B&aacute;c sĩ Trần Anh Tuấn hiện l&agrave; b&aacute;c sĩ cao cấp, Trưởng khoa H&ocirc; hấp Bệnh viện Nhi đồng 1, Ph&oacute; Chủ tịch Hội H&ocirc; hấp Nhi Việt Nam, Ph&oacute; Chủ tịch Hội H&ocirc; hấp TPHCM, Ph&oacute; Chủ tịch Chi hội Miễn dịch - Dị ứng Nhi Việt Nam.</p><p>Ngo&agrave;i ra, B&aacute;c sĩ Tuấn c&ograve;n l&agrave;m giảng vi&ecirc;n thỉnh giảng tại trường Đại học Y Dược TP.HCM, Trường Đại học Y Khoa Phạm Ngọc Thạch, Khoa Y trường Đại học Quốc gia TP.HCM.</p>`,
    `<p>BS.CKII Huỳnh Phan Ph&uacute;c Linh c&oacute; hơn 20 năm l&agrave;m việc, thăm kh&aacute;m v&agrave; điều trị Nội Tổng qu&aacute;t, Cơ Xương Khớp tại bệnh viện Chợ Rẫy.</p>`,
    `<p>ThS.BS.CK2&nbsp;Ho&agrave;ng Thị Thu Huyền c&oacute; hơn 20 năm kinh nghiệm thăm kh&aacute;m v&agrave; điều trị trong lĩnh vực Sản phụ khoa - Ung Bướu.</p><p>BS Ho&agrave;ng Thị Thu Huyền l&agrave; một trong c&aacute;c ph&ograve;ng kh&aacute;m sản phụ khoa - Ung Bướu uy t&iacute;n ở Hồ ch&iacute; Minh, cũng như được c&aacute;c mẹ bầu, chị em phụ nữa tin tưởng khi đến kh&aacute;m, b&aacute;c sĩ lu&ocirc;n để lại ấn tượng s&acirc;u sắc trong l&ograve;ng bệnh nh&acirc;n bởi sự nhẹ nh&agrave;ng, tận t&igrave;nh v&agrave; chu đ&aacute;o trong&nbsp;việc thăm kh&aacute;m v&agrave; điều trị.</p><p>BS.CK2 Ho&agrave;ng Thị Thu Huyền hiện đang c&ocirc;ng t&aacute;c tại Bệnh Viện H&ugrave;ng Vương, giữ chức vụ Ph&oacute; Trưởng Khoa.</p><p>Ph&ograve;ng kh&aacute;m được trang bị c&aacute;c thiết bị hiện đại, kh&ocirc;ng gian tho&aacute;ng m&aacute;t, thoải m&aacute;i cho c&aacute;c chị em phụ nữ khi đến kh&aacute;m.</p>`,
    `<p>B&aacute;c sĩ Chuy&ecirc;n khoa II L&yacute; Th&aacute;i Lộc c&oacute; 33 năm kinh nghiệm, thực h&agrave;nh trong lĩnh vực Sản Phụ khoa v&agrave; 28 năm kinh nghiệm trong lĩnh vực Hiếm muộn, Thụ tinh ống nghiệm. Hiện tại, B&aacute;c sĩ L&yacute; Th&aacute;i Lộc đang giữ chức vụ Trưởng khoa Hiếm muộn &ndash; Bệnh viện H&ugrave;ng Vương.</p><p>L&agrave; một b&aacute;c sĩ giỏi v&agrave; c&oacute; bề d&agrave;y kinh nghiệm cũng như chuy&ecirc;n m&ocirc;n cao, B&aacute;c sĩ L&yacute; Th&aacute;i Lộc được rất nhiều bệnh nh&acirc;n y&ecirc;u mến v&agrave; tin tưởng đến thăm kh&aacute;m khi c&oacute; vấn đề về Sản Phụ khoa &ndash; Hiếm muộn.</p>`,
  ],
};

const seedDoctor = async () => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await Doctor.deleteMany({}, { session });
      console.log("✅ Old doctors removed.");

      const users = await User.find({}).limit(10).session(session);
      const specialties = await Specialty.find({}).session(session);

      if (users.length === 0 || specialties.length === 0) {
        throw new Error("Missing users or specialties for seeding doctors.");
      }

      const doctors = users?.map((item, index) => ({
        user: item?._id,
        title: doctorsData.titles[index],
        avatar_url: doctorsData.avatar_urls[index],
        experience_years: doctorsData.experienceYears[index],
        specializations: doctorsData.specializations[index]
          ?.map(
            (specialty) =>
              specialties?.find(
                (s) => s.name.toLowerCase() === specialty.toLowerCase()
              )?._id
          )
          .filter(Boolean),
        bio: doctorsData.bios[index],
        position: doctorsData.positions[index],
        workplace: doctorsData.workplaces[index],
      }));

      console.log(`✅ ${doctors.length} doctors will be inserted.`);
      await Doctor.insertMany(doctors, { session });
      console.log("✅ Doctors seeded successfully.");
    });
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    throw error;
  } finally {
    session.endSession();
  }
};

export default seedDoctor;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await connectDB();
      await seedDoctor();

      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding doctors:", error);
      process.exit(1);
    }
  })();
}
