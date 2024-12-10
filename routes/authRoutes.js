// routes/authRoutes.js
const Router = require("express");
const router = Router();
const authController = require('../controllers/authController');


// Hiển thị trang đăng nhập
// router.get('/authentication/sign-in', authController.getLogin);

// Đăng kí
router.post('/api/authentication/customer-register', authController.customerRegister);

// Xử lý đăng nhập
router.post('/api/authentication/sign-in', authController.postLogin);

// Đăng xuất
router.get('/api/logout', authController.logout);


module.exports = router;
