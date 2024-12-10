const db = require("../config/db");
const cloudinary = require("../config/cloudinary");
const { DichVu } = require("../models");

// Lấy tất cả dịch vụ
exports.getAllServices = async (req, res) => {
  try {
    const services = await DichVu.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm dịch vụ
exports.addService = async (req, res) => {
  try {
    const { ten_dich_vu, mo_ta, hinh_anh, thoi_luong, gia_tien } = req.body;
    const newService = await DichVu.create({
      ten_dich_vu,
      mo_ta,
      hinh_anh,
      thoi_luong,
      gia_tien,
    });
    res.status(201).json(newService);
    // console.log("dữ liệu", ten_dich_vu, mo_ta, hinh_anh, thoi_luong, gia_tien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Xóa dịch vụ
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await DichVu.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
