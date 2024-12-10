const db = require('../config/db'); // Kết nối với cơ sở dữ liệu
const { TaiKhoan } = require('../models');
//require thư viện hash password
const bcryptjs = require('bcryptjs');
 
// Lấy danh sách khách hàng
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await TaiKhoan.findAll({ where: { id_phan_quyen: 3 } });
        res.status(200).json({
        message: 'Lấy dữ liệu thành công!',
        data: customers
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
}

//Lấy danh sách nhân viên
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await TaiKhoan.findAll({ where: { id_phan_quyen: 2 } });
        res.status(200).json({
        message: 'Lấy dữ liệu thành công!',
        data: employees
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
}

//Thêm nhân viên
exports.addEmployee = async (req, res) => {
    try {
        const { ho_ten, gioi_tinh, email, so_dien_thoai } = req.body;
        //ảnh đại diện mặc định
        const anh_dai_dien = 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732359558/vzldabtubv48zwg4gu8d.png';
        //tạo mật khẩu mặc định cho nhân viên
        const mat_khau = bcryptjs.hashSync('abc123', 10);
        const id_phan_quyen = 2;
        const trang_thai_tai_khoan = "Hoạt động"
        const newEmployee = await TaiKhoan.create({ ho_ten, anh_dai_dien, gioi_tinh, email, so_dien_thoai, mat_khau, id_phan_quyen, trang_thai_tai_khoan });
        res.status(201).json({
        message: 'Thêm nhân viên thành công!',
        data: newEmployee
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
}

//Cập nhật nhân viên
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { ho_ten, gioi_tinh, email, so_dien_thoai } = req.body;
        const employee = await TaiKhoan.findByPk(id);
        if (!employee) {
        return res.status(404).json({ message: 'Nhân viên không tồn tại!' });
        }
        employee.ho_ten = ho_ten;
        employee.gioi_tinh = gioi_tinh;
        employee.email = email;
        employee.so_dien_thoai = so_dien_thoai;
        await employee.save();
        res.status(200).json({
        message: 'Cập nhật nhân viên thành công!',
        data: employee
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
}

//Xóa nhân viên
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await TaiKhoan.findByPk(id);
        if (!employee) {
        return res.status(404).json({ message: 'Nhân viên không tồn tại!' });
        }
        await employee.destroy();
        res.status(200).json({
        message: 'Xóa nhân viên thành công!',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
}

