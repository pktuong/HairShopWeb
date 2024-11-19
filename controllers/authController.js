// controllers/authController.js
const db = require('../config/db'); // Kết nối với cơ sở dữ liệu

// Hiển thị form đăng nhập
exports.getLogin = (req, res) => {
  res.render('/authentication/sign-in');
};


// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
  const { email, mat_khau } = req.body;  
  const { TaiKhoan } = require('../models');

// Tìm tài khoản theo email
  const taiKhoan = await TaiKhoan.findOne({ where: { email: email } });

  if (taiKhoan[0].mat_khau === mat_khau) {
    req.session.userId = taiKhoan[0].id_tai_khoan;
    req.session.hoTen = taiKhoan[0].ho_ten;
    req.session.role = taiKhoan[0].id_phan_quyen;
    return res.redirect('/dashboard');
  } else {
    return res.status(401).send('Mật khẩu sai');
  }
  // Truy vấn cơ sở dữ liệu để kiểm tra tài khoản
  // db.query('SELECT * FROM tai_khoan WHERE email = ?', [email], (err, results) => {
  //   if (err) {
  //     return res.status(500).send('Lỗi kết nối cơ sở dữ liệu');
  //   }

  //   if (results.length === 0) {
  //     return res.status(401).send('Email không đúng');
  //   }

  //   const user = results[0];

  //   // Kiểm tra mật khẩu (sử dụng bcrypt hoặc so sánh trực tiếp nếu không mã hóa)
  //   if (user.mat_khau === mat_khau) {  // Nếu mật khẩu đúng
  //     // Lưu thông tin người dùng vào session
  //     req.session.userId = user.id_tai_khoan;
  //     req.session.hoTen = user.ho_ten;
  //     req.session.role = user.id_phan_quyen; // Quản trị viên hoặc nhân viên

  //     req.sesstion.test = taiKhoan.gioi_tinh;

  //     return res.redirect('/dashboard'); // Sau khi đăng nhập thành công, chuyển hướng tới trang dashboard
  //   } else {
  //     return res.status(401).send('Mật khẩu sai');
  //   }
  // });
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
