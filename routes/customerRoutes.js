// routes/authRoutes.js
const Router = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });

const hairStyles = require("../controllers/hairStyleController");
const Appointments = require("../controllers/apptController");
const Images = require("../controllers/imageController");
const Services = require("../controllers/serviceController");
const Payment = require("../controllers/paymentController");
const User = require("../controllers/userController");

//lấy thông tin tài khoản theo id
router.get("/api/customers/getCustomerById/:id", User.getCustomerById);

// Kiểu tóc
router.get("/api/customers/getAllHairStyles", hairStyles.getAllHairStyles);
router.get("/api/customers/getHairStyleById/:id", hairStyles.getHairStyleById);

router.post(
  "/api/upload/Images",
  upload.array("images", 10),
  Images.uploadImages
);
//get kiểu tóc theo kieu_khuon_mat
router.get(
  "/api/getHairStylesByFaceShape/:kieu_khuon_mat",
  hairStyles.getHairStylesByFaceShape
);

router.get("/api/test/:date", (req, res) => {
  const timeSlots = [
    { time: "7:30 AM", available: true, slotNum: 3 },
    { time: "8:00 AM", available: true, slotNum: 3 },
    { time: "8:30 AM", available: true, slotNum: 3 },
    { time: "9:00 AM", available: true, slotNum: 3 },
    { time: "9:30 AM", available: true, slotNum: 3 },
    { time: "10:00 AM", available: true, slotNum: 3 },
    { time: "10:30 AM", available: true, slotNum: 3 },
    { time: "11:00 AM", available: true, slotNum: 3 },
    { time: "11:30 AM", available: true, slotNum: 3 },
    { time: "1:30 PM", available: true, slotNum: 3 },
    { time: "2:00 PM", available: true, slotNum: 3 },
    { time: "2:30 PM", available: true, slotNum: 3 },
    { time: "3:00 PM", available: true, slotNum: 3 },
    { time: "3:30 PM", available: true, slotNum: 3 },
    { time: "4:00 PM", available: true, slotNum: 3 },
  ];

  try {
    const date = req.params.date;
    const dateconvert = new Date(date);
    console.log(dateconvert);
    // Kiểm tra nếu ngày truyền vào là hôm nay
    const currentDate = new Date();
    const isToday =
      dateconvert.getFullYear() === currentDate.getFullYear() &&
      dateconvert.getMonth() === currentDate.getMonth() &&
      dateconvert.getDate() === currentDate.getDate();

    if (isToday) {
      // Giờ hiện tại cộng thêm 3 tiếng
      const nowPlus3Hours = new Date(
        currentDate.getTime() + 10 * 60 * 60 * 1000
      );

      console.log("nowPlus3Hours", nowPlus3Hours);

      timeSlots.forEach((slot) => {
        const slotTime = convertTo24Hour(slot.time);

        const slotDateTime = new Date(
          currentDate.toISOString().split("T")[0] + "T" + slotTime + ".000Z"
        );

        if (slotDateTime < nowPlus3Hours) {
          slot.available = false; // Cập nhật trạng thái nếu nhỏ hơn giờ hiện tại + 3 tiếng
        }
      });
    }

    res.json(timeSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
function convertTo24Hour(time) {
    const [hour, minute, period] = time.match(/(\d+):(\d+)\s?(AM|PM)/).slice(1);
    let hours24 = parseInt(hour, 10);
    if (period === "PM" && hours24 !== 12) hours24 += 12;
    if (period === "AM" && hours24 === 12) hours24 = 0;
    return `${String(hours24).padStart(2, "0")}:${minute}:00`;
  }
// dịch vụ
router.get("/api/services/getAllServices", Services.getAllServices);

// PHIẾU ĐẶT
router.get("/api/getApptsByStatus", Appointments.getApptsByStatus);
router.get("/api/getApptByDate/:date", Appointments.getApptByDate);
router.get("/api/getFreeTime/:date", Appointments.getFreeTime);
router.get("/api/getApptByCustomer", Appointments.getApptByCustomer); // /api/getApptByCustomer?id=123&trang_thai_lich_hen=đã xác nhận
router.get("/api/getApptDetail/:id", Appointments.getApptDetail);
//Tạo phiếu đặt
router.post("/api/createAppt", Appointments.createAppt);
//Thay đổi trạng thái phiếu ĐẶT
router.put("/api/customerUpdateAppt/:id", Appointments.customerUpdateAppt);

//Lấy chi tiết đánh giá kiểu tóc
router.get("/api/getHairRating/:id", Appointments.getHairRating);
//Lấy chi tiết đánh giá dịch vụ
router.get("/api/getServiceRating/:id", Appointments.getServiceRating);
//Thêm đánh giá kiểu tóc
router.post("/api/addHairRating", Appointments.addHairRating);
//Thêm đánh giá dịch vụ
router.post("/api/addServiceRating", Appointments.addServiceRating);
//Cập nhật đánh giá kiểu tóc
router.put("/api/updateHairRating/:id", Appointments.updateHairRating);
//Cập nhạt đánh giá dịch vụ
router.put("/api/updateServiceRating/:id", Appointments.updateServiceRating);

//Thanh toán
router.post("/api/createPayment", Payment.createPayment);
router.post("/api/checkPayment", Payment.checkPayment);
router.post("/api/refundPayment", Payment.refundPayment);
router.post("/api/checkRefund", Payment.checkRefund);

//Quên mật khẩu
//Cập nhật thông tin cá nhân
//Đổi mật khẩu
//Thêm kiểu tóc vào yêu thích
router.post("/api/addFavoriteHairStyle", hairStyles.addFavoriteHairStyle);
//Xóa kiểu tóc khỏi yêu thích
router.delete(
  "/api/deleteFavoriteHairStyle",
  hairStyles.deleteFavoriteHairStyle
);
//Xem kiểu tóc yêu thích
router.get("/api/getFavoriteHairStyles/:id", hairStyles.getFavoriteHairStyles);
//check id kiểu tóc có trong yêu thích không
router.get("/api/checkFavoriteHairStyle", hairStyles.checkFavoriteHairStyle);

module.exports = router;
