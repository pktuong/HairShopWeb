const { KieuToc } = require("../models");
const { HinhAnhKieuToc } = require("../models");
const { PhieuDat } = require("../models");
const { ChiTietPhieuDat } = require("../models");
const { DichVu } = require("../models");
const { ChiTietDichVu } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

exports.getTopHairStylesInMonth = async (req, res) => {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 2);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const topKieuToc = await ChiTietPhieuDat.findAll({
      attributes: [
        "id_kieu_toc",
        [sequelize.fn("COUNT", sequelize.col("id_kieu_toc")), "so_luot_dat"],
      ],
      where: {
        id_kieu_toc: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: PhieuDat,
          as: "phieuDat",
          attributes: [],
          where: {
            trang_thai_lich_hen: "Đã hoàn thành",
            // thoi_gian_hen: {
            //   [Op.between]: [firstDayOfMonth, lastDayOfMonth],
            // },
          },
        },
        {
          model: KieuToc,
          as: "kieuToc",
          attributes: ["ten_kieu_toc"],
          include: [
            {
              model: HinhAnhKieuToc,
              as: "hinh_anh_kieu_toc",
              attributes: ["url_anh"],
            },
          ],
        },
      ],
      group: ["id_kieu_toc"],
      order: [[sequelize.literal("so_luot_dat"), "DESC"]],
      limit: 5,
    });
    res.status(200).json({
      success: true,
      data: topKieuToc,
    });
  } catch (error) {
    console.error("Error fetching top hairstyles:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getTopServicesInMonth = async (req, res) => {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 2);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const topDichVu = await ChiTietDichVu.findAll({
      attributes: [
        "id_dich_vu",
        [sequelize.fn("COUNT", sequelize.col("id_dich_vu")), "so_luot_dat"],
      ],
      include: [
        {
          model: ChiTietPhieuDat,
          as: "chiTietPhieuDats",
          attributes: [],
          include: [
            {
              model: PhieuDat,
              as: "phieuDat",
              attributes: [],
              where: {
                trang_thai_lich_hen: "Đã hoàn thành",
                thoi_gian_hen: {
                  [Op.between]: [firstDayOfMonth, lastDayOfMonth],
                },
              },
            },
          ],
        },
        {
          model: DichVu,
          as: "CTDV_DV",
          attributes: ["ten_dich_vu", "hinh_anh"],
        },
      ],
      group: ["id_dich_vu"],
      order: [[sequelize.literal("so_luot_dat"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      success: true,
      data: topDichVu,
    });
  } catch (error) {
    console.error("Error fetching top services:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getRevenueIn7Days = async (req, res) => {
  try {
    const now = new Date();
    const days = [];

    // Tạo danh sách 7 ngày gần nhất
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      days.push(date.toISOString().split("T")[0]); // Chuyển về dạng YYYY-MM-DD
    }

    // Truy vấn doanh thu từ cơ sở dữ liệu
    const revenueData = await PhieuDat.findAll({
      attributes: [
        [sequelize.fn("date", sequelize.col("thoi_gian_hen")), "ngay"],
        [sequelize.fn("SUM", sequelize.col("tong_tien")), "doanh_thu"],
      ],
      where: {
        trang_thai_lich_hen: "Đã hoàn thành",
        thoi_gian_hen: {
          [Op.between]: [days[0], days[6] + " 23:59:59"], // Khoảng thời gian từ ngày đầu đến cuối
        },
      },
      group: ["ngay"],
    });

    // Chuyển kết quả thành dạng dễ xử lý
    const revenueMap = revenueData.reduce((acc, record) => {
      acc[record.get("ngay")] = parseFloat(record.get("doanh_thu")) || 0;
      return acc;
    }, {});

    // Tạo danh sách doanh thu đầy đủ
    const finalRevenue = days.map((day) => ({
      ngay: day,
      doanh_thu: revenueMap[day] || 0,
    }));

    res.status(200).json({
      success: true,
      data: finalRevenue,
    });
  } catch (error) {
    console.error("Error fetching revenue in 7 days:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//hàm thống kê lịch hẹn hoàn thành, bị hủy, bị lỡ trong 30 ngày qua
exports.getAppointmentStatusInMonth = async (req, res) => {
  try {
    const now = new Date();
    // const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString(); // Ngày hôm nay lúc 00:00:00
    const endDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30, 0, 0, 0, 0).toISOString(); // 30 ngày trước lúc 00:00:00



    // Truy vấn dữ liệu từ cơ sở dữ liệu
    const appointmentData = await PhieuDat.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("trang_thai_lich_hen")), "so_luong"],
        "trang_thai_lich_hen",
      ],
      where: {
        thoi_gian_hen: {
          [Op.between]: [endDay, now],
        },
        trang_thai_lich_hen: {
          [Op.not]: "Đã đặt",
        },
      },
      group: ["trang_thai_lich_hen"],
    });

    // Tính tổng số lịch hẹn
    const totalAppointments = appointmentData.reduce((acc, record) => {
      return acc + record.get("so_luong");
    }, 0);

    // Tạo dữ liệu cuối cùng
    const finalData = appointmentData.map((record) => {
      const status = record.get("trang_thai_lich_hen");
      const count = record.get("so_luong");
      const percentage = (count / totalAppointments) * 100;
      return {
        trang_thai: status,
        so_luong: count,
        phan_tram: percentage,
      };
    });

    //Thêm tổng số lịch hẹn vào finalData
    finalData.push({
      tong_so_lich_hen: totalAppointments,
    });


    res.status(200).json({
      success: true,
      data: finalData,
    });
  } catch (error) {
    console.error("Error fetching appointment status in month:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Thống kê doanh thu theo tháng: input là năm, output là doanh thu từng tháng trong năm đó
exports.getRevenueByMonth = async (req, res) => {
  try {
    const { year } = req.params;

    // Xác định ngày đầu năm và cuối năm, không sử dụng toISOString để tránh sai múi giờ
    const startDay = new Date(year, 0, 1, 0, 0, 0, 0); // Ngày đầu năm
    const endDay = new Date(year, 11, 31, 23, 59, 59, 999); // Ngày cuối năm

    // Lấy dữ liệu doanh thu
    const revenueData = await PhieuDat.findAll({
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("thoi_gian_hen")), "thang"],
        [sequelize.fn("SUM", sequelize.col("tong_tien")), "doanh_thu"],
      ],
      where: {
        trang_thai_lich_hen: "Đã hoàn thành",
        thoi_gian_hen: {
          [Op.between]: [startDay, endDay],
        },
      },
      group: ["thang"],
    });

    // Chuyển đổi dữ liệu thành dạng map để tiện sử dụng
    const revenueMap = revenueData.reduce((acc, record) => {
      const month = record.get("thang");
      const revenue = parseFloat(record.get("doanh_thu")) || 0;
      if (month) acc[month] = revenue; // Chỉ thêm nếu "thang" không null
      return acc;
    }, {});

    // Tạo danh sách doanh thu theo 12 tháng
    const finalRevenue = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return {
        thang: month,
        doanh_thu: revenueMap[month] || 0,
      };
    });

    // Trả kết quả thành công
    res.status(200).json({
      success: true,
      data: finalRevenue,
    });
  } catch (error) {
    console.error("Error fetching revenue by month:", error.message);

    // Trả kết quả lỗi
    res.status(500).json({
      success: false,
      message: "Không thể lấy dữ liệu doanh thu. Vui lòng thử lại sau.",
      error: error.message, // Bao gồm chi tiết lỗi
    });
  }
};

//Thống kê số lịch hẹn đã hoàn thành, doanh thu, kiểu tóc đặt nhiều nhất theo từng ngày trong khoảng thời gian
exports.getRevenueDataByDateRange = async (req, res) => {
  try {
    const { start, end } = req.params;

    const startDay = new Date(start);
    const endDay = new Date(end);

    // Lấy dữ liệu từ cơ sở dữ liệu
    const appointmentData = await PhieuDat.findAll({
      attributes: [
        [sequelize.fn("date", sequelize.col("thoi_gian_hen")), "ngay"],
        [sequelize.fn("COUNT", sequelize.col("id")), "so_luong"],
        [sequelize.fn("SUM", sequelize.col("tong_tien")), "doanh_thu"],
        [sequelize.literal(`
          (SELECT ten_kieu_toc
           FROM chitietphieudats AS ctpd
           INNER JOIN kieutocs AS kt ON ctpd.id_kieu_toc = kt.id
           WHERE ctpd.id_phieu_dat = PhieuDat.id
           GROUP BY kt.ten_kieu_toc
           ORDER BY COUNT(kt.ten_kieu_toc) DESC
           LIMIT 1
          )`), "kieu_toc_dat_nhieu_nhat"],
      ],
      where: {
        trang_thai_lich_hen: "Đã hoàn thành",
        thoi_gian_hen: {
          [Op.between]: [startDay, endDay],
        },
      },
      group: ["ngay"],
    });

    // Chuyển dữ liệu thành dạng dễ xử lý
    // const finalData = appointmentData.map((record) => {
    //   const date = record.get("ngay");
    //   const count = record.get("so_luong");
    //   const revenue = parseFloat(record.get("doanh_thu")) || 0;
    //   const topKieuToc = record.chiTietPhieuDats.reduce((acc, detail) => {
    //     const kieuToc = detail.kieuToc.get("ten_kieu_toc");
    //     acc[kieuToc] = (acc[kieuToc] || 0) + 1;
    //     return acc;
    //   }, {});

    //   return {
    //     ngay: date,
    //     so_luong: count,
    //     doanh_thu: revenue,
    //     top_kieu_toc: topKieuToc,
    //   };
    // });

    // Trả kết quả thành công

    res.status(200).json({
      success: true,
      data: appointmentData,
    });
  }
  catch (error) {
    console.error("Error fetching appointment data by date range:", error.message);

    // Trả kết quả lỗi
    res.status(500).json({
      success: false,
      message: "Không thể lấy dữ liệu thống kê. Vui lòng thử lại sau.",
      error: error.message, // Bao gồm chi tiết lỗi
    });
  }
}