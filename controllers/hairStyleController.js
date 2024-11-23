const db = require('../config/db')
const { KieuToc } = require('../models');

// Lấy danh sách kiểu tóc
exports.getAllHairStyles = async (req, res) => {
    try {
        const hairStyles = await KieuToc.findAll();
        res.status(200).json({
            message: 'Lấy dữ liệu thành công!',
            data: hairStyles
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
}

