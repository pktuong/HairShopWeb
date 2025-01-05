// controllers/authController.js
const db = require('../config/db'); // Kết nối với cơ sở dữ liệu
require("dotenv").config()
const bcryptjs = require('bcryptjs');
const { TaiKhoan } = require('../models');
const { data } = require('autoprefixer');

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

// Hiển thị form đăng nhập
exports.getLogin = (req, res) => {
  res.render('/authentication/sign-in');
};

exports.sendOTPVerifiEmail = async (req, res) => {
  try {
    
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    let {email} = req.body;
    //mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Xác thực tài khoản email cho Hair Salon",
      html: `<p>Mã OTP để xác minh tài khoản email của bạn là: <b>${otp}</b></p>`,
    };

    //hash the otp
    const saltRounds = 10;
    const hashedOTP = await bcryptjs.hash(otp, saltRounds);
    await transporter.sendMail(mailOptions)
    res.json({
      status: "SUCCESS",
      message: "Verification otp email sent!",
      data: {
        hashedOTP: hashedOTP,
        // otp:otp
      },
    });
  } catch (error) {
      console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred while sending OTP verification email",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    let { otp, hashedOTP } = req.body;
    if (!otp) {
      throw Error("OPT không được để trống");
    } else {
    //   const hashedOTP = otp;
      const validOTP = await bcryptjs.compare(otp, hashedOTP);

      if (!validOTP) {
        res.status(400).json({
          status: "FAILED",
          message: "Sai mã OTP. Hãy kiểm tra email của bạn!",
        });
      } else {
        res.json({
          status: "SUCCESS",
          message: "Xác thực OTP thành công",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "FAILED",
      message: "Xảy ra lỗi khi xác thực OTP",
    });
  }
};

//Đăng kí tài khoản khách hàng
exports.customerRegister = async (req, res) => {
  let { ho_ten, email, mat_khau, otp, hashedOTP  } = req.body;
  try { 
    if (!otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const validOTP = await bcryptjs.compare(otp, hashedOTP);
      if (!validOTP) {
        res.status(400).json({
          status: "Thất bại",
          message: "Sai mã OTP. Hãy kiểm tra email của bạn!",
        });
      }else{
        //Kiểm tra email đã tồn tại chưa
        const taiKhoan = await TaiKhoan.findOne({ where: { email: email } });
        if (taiKhoan) {
          return res.status(400).json({ message: 'Email đã tồn tại' });
        }

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

    }

  }
  catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const taiKhoan = await TaiKhoan.findOne({ where: { email: email } });
    if (!taiKhoan) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }
    taiKhoan.mat_khau = hashedPassword;
    await taiKhoan.save();
    res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Có lỗi xảy ra",
    });
  }
}

// Xử lý đăng nhập admin
exports.postAdminLogin = async (req, res) => {
  let { email, mat_khau } = req.body;  

  try {
    //Tìm tài khoản theo email, có trang_thai_tai_khoan là "Hoạt động", id_phan_quyen là 1 hoặc 2
    const taiKhoan = await TaiKhoan.findOne({ where: { email: email, trang_thai_tai_khoan: "Hoạt động", id_phan_quyen: [1,2] } });
    if (!taiKhoan) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' });
    }

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
    return res.status(500).json({ message: 'Tài khoản không tồn tại' });
  }
};

// Xử lý đăng nhập người dùng
exports.postCustomerLogin = async (req, res) => {
  let { email, mat_khau } = req.body;  

  try {
    //Tìm tài khoản theo email, có trang_thai_tai_khoan là "Hoạt động", id_phan_quyen là 3
    const taiKhoan = await TaiKhoan.findOne({ where: { email: email, id_phan_quyen: 3 } });
    if (!taiKhoan) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' });
    }

    const isMatch = await bcryptjs.compare(mat_khau, taiKhoan.mat_khau);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác' });
    }
    res.status(200).json({
      message: 'Đăng nhập thành công!',
      data: taiKhoan
    });
  } catch (error) {
    return res.status(500).json({ message: 'Tài khoản không tồn tại' });
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
