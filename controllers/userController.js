const db = require('../config/db'); // Kết nối với cơ sở dữ liệu
const { TaiKhoan } = require('../models');
 
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
    