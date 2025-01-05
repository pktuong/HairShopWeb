// routes/authRoutes.js
const Router = require("express");
const router = Router();
const authController = require('../controllers/authController');


// Hiển thị trang đăng nhập
// router.get('/authentication/sign-in', authController.getLogin);

// Đăng kí
router.post('/api/authentication/customer-register', authController.customerRegister);
// Gửi mã OTP
router.post('/api/authentication/send-otp', authController.sendOTPVerifiEmail);
// Xác thực mã OTP
router.post('/api/authentication/verify-otp', authController.verifyOTP);

// Xử lý đăng nhập admin
router.post('/api/authentication/admin-sign-in', authController.postAdminLogin);
// Xử lý đăng nhập người dùng
router.post('/api/authentication/customer-sign-in', authController.postCustomerLogin);

//Quên mật khẩu
router.put('/api/authentication/reset-password', authController.resetPassword);

// Đăng xuất
router.get('/api/logout', authController.logout);


module.exports = router;
