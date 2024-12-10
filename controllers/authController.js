// controllers/authController.js
const db = require('../config/db'); // Kết nối với cơ sở dữ liệu

const bcryptjs = require('bcryptjs');
const { TaiKhoan } = require('../models');
const { data } = require('autoprefixer');
// Hiển thị form đăng nhập
exports.getLogin = (req, res) => {
  res.render('/authentication/sign-in');
};

//Đăng kí tài khoản khách hàng
exports.customerRegister = (req, res) => {
  let { ho_ten, email, mat_khau  } = req.body;
  try { 
    TaiKhoan.create({
      ho_ten: ho_ten,
      anh_dai_dien: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732359558/vzldabtubv48zwg4gu8d.png',
      email: email,
      mat_khau: bcryptjs.hashSync(mat_khau, 10),
      trang_thai_tai_khoan:"Hoạt động",
      so_lan_vi_pham: 0,
      id_phan_quyen: 3
    });
    res.status(200).json({ message: 'Đăng ký thành công!' });
  }
  catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
};


// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
  let { email, mat_khau } = req.body;  

  try {
    const taiKhoan = await TaiKhoan.findOne({ where: { email: email } });
    // if (!taiKhoan) {
    //   return res.status(400).json({ message: 'Email không tồn tại' });
    // }

    const isMatch = await bcryptjs.compare(mat_khau, taiKhoan.mat_khau);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác' });
    }

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
