const db = require("../config/db"); // Kết nối với cơ sở dữ liệu
const { Op } = require("sequelize");
const { PhieuDat } = require("../models");
const { ChiTietPhieuDat } = require("../models");
const { ChiTietDichVu } = require("../models");
const { KieuToc } = require("../models");
const { DichVu } = require("../models");

// Lấy phiếu đặt theo ngày
exports.getApptByDate = async (req, res) => {
  try {
    const date = req.params.date;
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const appts = await PhieuDat.findAll({
      where: {
        thoi_gian_hen: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [
        {
          model: ChiTietPhieuDat,
          as: "chiTietPhieuDats",
          include: [
            {
              model: KieuToc,
              as: "kieuToc",
            },
            {
              model: ChiTietDichVu,
              as: "chiTietDichVus",
              include: [
                {
                  model: DichVu,
                  as: "CTDV_DV",
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//tạo một hàm chuyển thời gian từ 12 giờ AM/PM sang 24 giờ
function convertTo24Hour(time) {
  const [hour, minute, period] = time.match(/(\d+):(\d+)\s?(AM|PM)/).slice(1);
  let hours24 = parseInt(hour, 10);
  if (period === "PM" && hours24 !== 12) hours24 += 12;
  if (period === "AM" && hours24 === 12) hours24 = 0;
  return `${String(hours24).padStart(2, "0")}:${minute}:00`;
}

function convertTo12Hour(time) {
  let [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
}

// Hàm để chuyển đổi giờ từ dạng string sang Date (sử dụng UTC)
function convertToDate(timeString) {
  const date = new Date(
    `2024-12-10T${timeString.replace(" AM", "").replace(" PM", "")}:00.000Z`
  );
  if (timeString.includes("PM") && date.getHours() < 12) {
    date.setHours(date.getHours() + 12); // Chỉnh giờ cho PM
  }
  return date;
}

// Hàm tính thời gian kết thúc của một phiếu hẹn
function calculateEndTime(booking) {
  let endTime = new Date(booking.thoi_gian_hen);

  // Tính toán thời gian kết thúc từ chi tiết kiểu tóc và dịch vụ
  booking.chiTietPhieuDats.forEach((detail) => {
    const hairTime = detail.kieuToc.thoi_luong;
    endTime = new Date(endTime.getTime() + hairTime * 60000);

    detail.chiTietDichVus.forEach((service) => {
      const serviceTime = service.CTDV_DV.thoi_luong;
      endTime = new Date(endTime.getTime() + serviceTime * 60000);
    });
  });

  return endTime;
}

function getTime(timeString) {
  const date = new Date(timeString);

  // Lấy giờ, phút, giây từ đối tượng Date
  const hours = date.getUTCHours(); // Lấy giờ (UTC)
  const minutes = date.getUTCMinutes(); // Lấy phút (UTC)
  const seconds = date.getUTCSeconds(); // Lấy giây (UTC)

  // Định dạng lại thành dạng "HH:mm:ss"
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
}
function convertTimeToDate(timeString) {
  const now = new Date(); // Lấy ngày hiện tại
  const [hours, minutes, seconds] = timeString.split(':');
  
  // Tạo đối tượng Date với ngày hiện tại và thời gian 'timeString'
  return new Date(now.setHours(hours, minutes, seconds, 0));
}
exports.getFreeTime = async (req, res) => {
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
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Lấy tất cả các phiếu đặt trong ngày yêu cầu
    const appts = await PhieuDat.findAll({
      where: {
        thoi_gian_hen: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [
        {
          model: ChiTietPhieuDat,
          as: "chiTietPhieuDats",
          include: [
            { model: KieuToc, as: "kieuToc" },
            {
              model: ChiTietDichVu,
              as: "chiTietDichVus",
              include: [{ model: DichVu, as: "CTDV_DV" }],
            },
          ],
        },
      ],
    });

    // Duyệt qua từng timeSlot và kiểm tra xem có bị trùng với phiếu hẹn không
    timeSlots.forEach((slot) => {
      const slotTime = (convertTo24Hour(slot.time));
      // console.log("slotTime", slotTime);

      appts.forEach((booking) => {
        const bookingEndTime = calculateEndTime(booking);
        const bookingStartTime = new Date(booking.thoi_gian_hen);

        const slotTimeConverted = new Date(bookingStartTime.toISOString().split('T')[0] + 'T'+slotTime+'.000Z')

        // console.log("slotTime", new Date(bookingStartTime.toISOString().split('T')[0] + 'T'+slotTime+'.000Z'));
        // console.log("startTime", bookingStartTime);
        // console.log("endTime", bookingEndTime);


        // Nếu thời gian của slot nằm trong khoảng thời gian của phiếu đặt
        if (slotTimeConverted >= bookingStartTime && slotTimeConverted < bookingEndTime) {
          if (slot.slotNum > 0) {
            slot.slotNum -= 1;
          }

          // Nếu số slot còn lại = 0, cập nhật available = false
          if (slot.slotNum === 0) {
            slot.available = false;
          }
        }
      });
    });

    res.status(200).json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
