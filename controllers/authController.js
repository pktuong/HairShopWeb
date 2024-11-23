// controllers/authController.js
const db = require('../config/db'); // Kết nối với cơ sở dữ liệu

const bcryptjs = require('bcryptjs');
const { TaiKhoan } = require('../models');
const { data } = require('autoprefixer');
// Hiển thị form đăng nhập
exports.getLogin = (req, res) => {
  res.render('/authentication/sign-in');
};



// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
  let { email, mat_khau } = req.body;  

  try {
    const taiKhoan = await TaiKhoan.findOne({ where: { email: email } });

    req.session.userId = taiKhoan.id;
    req.session.hoTen = taiKhoan.ho_ten;
    req.session.role = taiKhoan.id_phan_quyen;
    res.status(200).json({
      message: 'Đăng nhập thành công!',
      data: taiKhoan
    });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

// Đăng xuất
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Lỗi đăng xuất');
    }
    res.redirect('/authentication/sign-in'); // Quay lại trang đăng nhập
  });
};
