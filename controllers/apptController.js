const db = require("../config/db"); // Kết nối với cơ sở dữ liệu

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const { Op, col } = require("sequelize");
const { PhieuDat } = require("../models");
const { ChiTietPhieuDat } = require("../models");
const { ChiTietDichVu } = require("../models");
const { KieuToc } = require("../models");
const { DichVu } = require("../models");
const { TaiKhoan } = require("../models");
const { HinhAnhKieuToc } = require("../models");
const { DanhGiaDichVu } = require("../models");
const { DanhGiaKieuToc } = require("../models");
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

function convertTime(timeString) {
  const date = new Date(timeString);
  const localDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(localDate);
}

exports.exportInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const appt = await PhieuDat.findOne({
      where: {
        id: id,
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

    const data = {
      ten_khach_hang: appt.chiTietPhieuDats[0].ten_khach_hang,
      thoi_gian_hen: convertTime(appt.thoi_gian_hen),
      thoi_gian_dat: convertTime(appt.thoi_gian_dat),
      phuong_thuc_thanh_toan: appt.phuong_thuc_thanh_toan,
      tong_tien: appt.tong_tien,

      apptDetails: appt.chiTietPhieuDats.map((detail) => {
        return {
          ten_khach_hang: detail.ten_khach_hang,
          kieu_toc: detail.kieuToc.ten_kieu_toc,
          phi_lam_toc: detail.phi_lam_toc,
          services: detail.chiTietDichVus.map((service) => {
            return {
              ten_dich_vu: service.CTDV_DV.ten_dich_vu,
              phi_dich_vu: service.phi_dich_vu,
            };
          }),
        };
      }),
    };

    const pdf = await generateInvoicePDF(data);
    const random = Math.floor(Math.random() * 9999999);
    // Gửi file PDF sau khi tạo xong
    const stream = fs.createWriteStream(`Hoa-don_${random}.pdf`);

    stream.on("finish", () => {
      res.download(`Hoa-don_${random}.pdf`, `Hoa-don_${random}.pdf`, (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        fs.unlinkSync(`Hoa-don_${random}.pdf`);
      });
    });

    stream.end(pdf);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

function generateInvoicePDF(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const pdfBuffer = [];
      doc.on("data", (chunk) => {
        pdfBuffer.push(chunk);
      });
      doc.on("end", () => {
        resolve(Buffer.concat(pdfBuffer));
      });

      // Đường dẫn tới font
      const fontPath = path.join(
        __dirname,
        "../public/assets/fonts/Roboto/Roboto-Regular.ttf"
      );

      // Kiểm tra nếu font không tồn tại
      if (!fs.existsSync(fontPath)) {
        reject(new Error("Font không tồn tại. Vui lòng kiểm tra đường dẫn."));
        return;
      }

      // Nạp font hỗ trợ Unicode
      doc.font(fontPath);

      // Nội dung hóa đơn
      doc.fontSize(20).text("HÓA ĐƠN THANH TOÁN", {
        align: "center",
      });

      doc.fontSize(18).text("HAIR SALON", {
        align: "center",
      });

      doc.moveDown();

      doc.fontSize(14).text(`Tên khách hàng: ${data.ten_khach_hang}`);
      doc.fontSize(14).text(`Thời gian hẹn: ${data.thoi_gian_hen}`);
      doc.fontSize(14).text(`Thời gian đặt: ${data.thoi_gian_dat}`);
      doc
        .fontSize(14)
        .text(`Phương thức thanh toán: ${data.phuong_thuc_thanh_toan}`);
      doc.fontSize(14).text(`Tổng tiền: ${data.tong_tien}đ`);
      //Tách phần chi tiết dịch vụ xuống phía dưới
      doc.moveDown();

      doc.fontSize(16).text("Chi tiết dịch vụ:");

      data.apptDetails.forEach((detail) => {
        doc.fontSize(14).text(`Tên khách hàng: ${detail.ten_khach_hang}`);
        //Kiểm tra nếu không có kiểu tóc nào
        if (!detail.kieu_toc) {
          doc.fontSize(14).text("Không đặt kiểu tóc");
        } else {
          doc.fontSize(14).text(`Kiểu tóc: ${detail.kieu_toc}`);
          doc.fontSize(14).text(`Phí làm tóc: ${detail.phi_lam_toc}đ`);
        }
        doc.fontSize(14).text("Dịch vụ:");
        //KIểm tra nếu không có dịch vụ nào
        if (detail.services.length === 0) {
          doc.fontSize(14).text("Không đặt dịch vụ");
        } else {
          detail.services.forEach((service) => {
            doc.fontSize(14).text(`Tên dịch vụ: ${service.ten_dich_vu}`);
            doc.fontSize(14).text(`Phí dịch vụ: ${service.phi_dich_vu}đ`);
          });
        }
        doc.moveDown();
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

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
    if (detail.kieuToc) {
      const hairTime = detail.kieuToc.thoi_luong;
      endTime = new Date(endTime.getTime() + hairTime * 60000);
    }

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
  const [hours, minutes, seconds] = timeString.split(":");

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
    const dateconvert = new Date(date);

    // Kiểm tra nếu ngày truyền vào là hôm nay
    const currentDate = new Date();
    const isToday =
      dateconvert.getFullYear() === currentDate.getFullYear() &&
      dateconvert.getMonth() === currentDate.getMonth() &&
      dateconvert.getDate() === currentDate.getDate();

    if (isToday) {
      // Giờ hiện tại utc+7 cộng thêm 3 tiếng
      const nowPlus3Hours = new Date(currentDate.getTime() + 10 * 60 * 60 * 1000);

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

    // Tạo startOfDay
    const startOfDay = new Date(dateconvert);
    startOfDay.setHours(0, 0, 0, 0);

    // Tạo endOfDay
    const endOfDay = new Date(dateconvert);
    endOfDay.setHours(23, 59, 59, 999);

    // Điều chỉnh múi giờ nếu cần
    const timezoneOffset = +7 * 60;
    const startOfDayLocal = new Date(
      startOfDay.getTime() + timezoneOffset * 60 * 1000
    );
    const endOfDayLocal = new Date(
      endOfDay.getTime() + timezoneOffset * 60 * 1000
    );

    // Lấy tất cả các phiếu đặt trong ngày yêu cầu
    const appts = await PhieuDat.findAll({
      where: {
        thoi_gian_hen: {
          [Op.between]: [startOfDayLocal, endOfDayLocal],
        },
        trang_thai_lich_hen: {
          [Op.not]: "Đã hủy",
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
      const slotTime = convertTo24Hour(slot.time);

      appts.forEach((booking) => {
        const bookingEndTime = calculateEndTime(booking);
        const bookingStartTime = new Date(booking.thoi_gian_hen);

        const slotTimeConverted = new Date(
          bookingStartTime.toISOString().split("T")[0] +
            "T" +
            slotTime +
            ".000Z"
        );

        // Nếu thời gian của slot nằm trong khoảng thời gian của phiếu đặt
        if (
          slotTimeConverted >= bookingStartTime &&
          slotTimeConverted < bookingEndTime
        ) {
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

exports.createAppt = async (req, res) => {
  try {
    const {
      id_tai_khoan,
      ngay_hen,
      gio_hen,
      phuong_thuc_thanh_toan,
      thoi_gian_dat,
      chi_tiet_phieu_dat,
    } = req.body;
    let trangthailichhen = "Đã đặt";

    const thoi_gian_hen = new Date(
      `${ngay_hen.split("T")[0]}T${convertTo24Hour(gio_hen)}.000Z`
    );
    let tong_tien = 0;
    chi_tiet_phieu_dat.forEach((element) => {
      if (element.kieu_toc.id_kieu_toc != 0) {
        tong_tien += parseInt(element.kieu_toc.gia);
      }
      element.dich_vu.forEach((service) => {
        if (service.id_dich_vu != 0) {
          tong_tien += parseInt(service.phi_dich_vu);
        }
      });
    });

    // Tạo một phiếu đặt mới
    const newAppt = await PhieuDat.create({
      id_tai_khoan: id_tai_khoan,
      thoi_gian_hen: thoi_gian_hen,
      phuong_thuc_thanh_toan: phuong_thuc_thanh_toan,
      tong_tien: tong_tien,
      trang_thai_lich_hen: trangthailichhen,
      thoi_gian_dat: thoi_gian_dat,
    });

    await Promise.all(
      chi_tiet_phieu_dat.map(async (item) => {
        if (item.kieu_toc.id_kieu_toc != 0) {
          const ctpd = await ChiTietPhieuDat.create({
            id_phieu_dat: newAppt.id,
            ten_khach_hang: item.ten_khach_hang,
            id_kieu_toc: item.kieu_toc.id_kieu_toc,
            phi_lam_toc: item.kieu_toc.gia,
          });
          if (item.dich_vu[0].id_dich_vu != 0) {
            await Promise.all(
              item.dich_vu.map(async (service) => {
                await ChiTietDichVu.create({
                  id_chi_tiet_phieu_dat: ctpd.id,
                  id_dich_vu: service.id_dich_vu,
                  phi_dich_vu: service.phi_dich_vu,
                });
              })
            );
          }
        } else {
          const ctpd = await ChiTietPhieuDat.create({
            id_phieu_dat: newAppt.id,
            ten_khach_hang: item.ten_khach_hang,
          });
          if (item.dich_vu[0].id_dich_vu != 0) {
            await Promise.all(
              item.dich_vu.map(async (service) => {
                await ChiTietDichVu.create({
                  id_chi_tiet_phieu_dat: ctpd.id,
                  id_dich_vu: service.id_dich_vu,
                  phi_dich_vu: service.phi_dich_vu,
                });
              })
            );
          }
        }
      })
    );
    res.status(201).json({ message: "Tạo phiếu đặt thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getApptsByStatus = async (req, res) => {
  try {
    const { trang_thai_lich_hen } = req.query;
    checkMissedAppointments();
    const appts = await PhieuDat.findAll({
      where: { trang_thai_lich_hen: trang_thai_lich_hen },
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
        {
          model: TaiKhoan,
          as: "TaiKhoanDat",
        },
      ],
    });

    if (!appts || appts.length === 0) {
      res.status(200).json([]);
    } else {
      const plainAppts = appts.map((appt) => appt.get({ plain: true }));

      plainAppts.forEach((appt) => {
        if (appt.thoi_gian_hen) {
          const date = new Date(appt.thoi_gian_hen);
          const localDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
          appt.thoi_gian_hen_formatted = new Intl.DateTimeFormat("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(localDate);
        } else {
          appt.thoi_gian_hen_formatted = "Không xác định";
        }
      });

      res.status(200).json(plainAppts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApptByCustomer = async (req, res) => {
  try {
    const { id, trang_thai_lich_hen } = req.query;
    checkMissedAppointments();
    const appts = await PhieuDat.findAll({
      where: {
        id_tai_khoan: id,
        trang_thai_lich_hen: trang_thai_lich_hen,
      },
      include: [
        {
          model: ChiTietPhieuDat,
          as: "chiTietPhieuDats",
          include: [
            {
              model: KieuToc,
              as: "kieuToc",
              include: [
                {
                  model: HinhAnhKieuToc,
                  as: "hinh_anh_kieu_toc",
                },
              ],
            },
            {
              model: DanhGiaKieuToc,
              as: "danhGiaKieuToc",
            },
            {
              model: ChiTietDichVu,
              as: "chiTietDichVus",
              include: [
                {
                  model: DichVu,
                  as: "CTDV_DV",
                },
                {
                  model: DanhGiaDichVu,
                  as: "DanhGiaDichVus",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!appts || appts.length === 0) {
      res.status(200).json([]);
    } else {
      const plainAppts = appts.map((appt) => appt.get({ plain: true }));
      plainAppts.forEach((appt) => {
        if (appt.thoi_gian_hen) {
          const date = new Date(appt.thoi_gian_hen);
          const localDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
          appt.thoi_gian_hen_formatted = new Intl.DateTimeFormat("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(localDate);
        } else {
          appt.thoi_gian_hen_formatted = "Không xác định";
        }
      });
      res.status(200).json(plainAppts);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//get chi tiết phiếu đặt theo id
exports.getApptDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await PhieuDat.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: ChiTietPhieuDat,
          as: "chiTietPhieuDats",
          include: [
            {
              model: KieuToc,
              as: "kieuToc",
              include: [
                {
                  model: HinhAnhKieuToc,
                  as: "hinh_anh_kieu_toc",
                },
              ],
            },
            {
              model: DanhGiaKieuToc,
              as: "danhGiaKieuToc",
            },
            {
              model: ChiTietDichVu,
              as: "chiTietDichVus",
              include: [
                {
                  model: DichVu,
                  as: "CTDV_DV",
                },
                {
                  model: DanhGiaDichVu,
                  as: "DanhGiaDichVus",
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(appt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { trang_thai_lich_hen, id_nhan_vien } = req.body;
    await PhieuDat.update(
      { trang_thai_lich_hen: trang_thai_lich_hen, id_nhan_vien: id_nhan_vien },
      {
        where: {
          id: id,
        },
      }
    );
    // console.log("id", id);
    // console.log("trang_thai_lich_hen", trang_thai_lich_hen);
    res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Hàm kiểm tra tất cả lịch hẹn và so sánh với thời gian hiện tại, nếu thời gian hiện tại > thời gian hẹn thì cập nhật trạng thái lịch hẹn thành "Đã lỡ hẹn"
function checkMissedAppointments() {
  const now = new Date();
  const today = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  PhieuDat.findAll().then((appts) => {
    appts.forEach((appt) => {
      const apptTime = new Date(appt.thoi_gian_hen);
      if (
        today.getTime() - apptTime.getTime() >= 1000 * 60 * 60 &&
        appt.trang_thai_lich_hen == "Đã đặt"
      ) {
        PhieuDat.update(
          { trang_thai_lich_hen: "Đã lỡ hẹn" },
          {
            where: {
              id: appt.id,
            },
          }
        );
      }
    });
  });
}

//Viết hàm kiểm tra số lần vi phạm, nếu lớn hơn 3 thì cập nhật trạng thái tài khoản thành bị khóa
function checkViolationTimes(id_tai_khoan) {
  TaiKhoan.findOne({
    where: {
      id: id_tai_khoan,
    },
  }).then((user) => {
    TaiKhoan.update(
      { so_lan_vi_pham: user.so_lan_vi_pham + 1 },
      {
        where: {
          id: id_tai_khoan,
        },
      }
    );
    if (user.so_lan_vi_pham >= 5) {
      TaiKhoan.update(
        { trang_thai_tai_khoan: "Bị khóa" },
        {
          where: {
            id: id_tai_khoan,
          },
        }
      );
    }
  });
}

exports.customerUpdateAppt = async (req, res) => {
  try {
    const { id } = req.params;
    const { trang_thai_lich_hen, id_tai_khoan } = req.body;
    await PhieuDat.update(
      { trang_thai_lich_hen: trang_thai_lich_hen },
      {
        where: {
          id: id,
        },
      }
    );
    if (trang_thai_lich_hen === "Đã hủy") {
      checkViolationTimes(id_tai_khoan);
    }
    res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Lấy chi tiết đánh giá kiểu tóc
exports.getHairRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await DanhGiaKieuToc.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Lấy chi tiết đánh giá dịch vụ
exports.getServiceRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await DanhGiaDichVu.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// "id": 2,
// "id_khach_hang": 4,
// "id_kieu_toc": 2,
// "id_chi_tiet_phieu_dat": 2,
// "muc_do_hai_long": 5,
//Thêm đánh giá kiểu tóc
exports.addHairRating = async (req, res) => {
  try {
    const {
      id_khach_hang,
      id_kieu_toc,
      id_chi_tiet_phieu_dat,
      muc_do_hai_long,
      phan_hoi,
    } = req.body;
    await DanhGiaKieuToc.create({
      id_khach_hang: id_khach_hang,
      id_kieu_toc: id_kieu_toc,
      id_chi_tiet_phieu_dat: id_chi_tiet_phieu_dat,
      muc_do_hai_long: muc_do_hai_long,
      phan_hoi: phan_hoi,
    });
    res.status(201).json({ message: "Thêm đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Thêm đánh giá dịch vụ
exports.addServiceRating = async (req, res) => {
  try {
    const {
      id_khach_hang,
      id_dich_vu,
      id_chi_tiet_dich_vu,
      muc_do_hai_long,
      phan_hoi,
    } = req.body;
    await DanhGiaDichVu.create({
      id_khach_hang: id_khach_hang,
      id_dich_vu: id_dich_vu,
      id_chi_tiet_dich_vu: id_chi_tiet_dich_vu,
      muc_do_hai_long: muc_do_hai_long,
      phan_hoi: phan_hoi,
    });
    res.status(201).json({ message: "Thêm đánh giá thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật đánh giá kiểu tóc
exports.updateHairRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { muc_do_hai_long, phan_hoi } = req.body;
    await DanhGiaKieuToc.update(
      { muc_do_hai_long: muc_do_hai_long, phan_hoi: phan_hoi },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật đánh giá dịch vụ
exports.updateServiceRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { muc_do_hai_long, phan_hoi } = req.body;
    await DanhGiaDichVu.update(
      { muc_do_hai_long: muc_do_hai_long, phan_hoi: phan_hoi },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
