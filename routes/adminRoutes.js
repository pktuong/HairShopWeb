// routes/authRoutes.js
const Router = require("express");
const router = Router();
const user = require('../controllers/userController');
const hairStyle = require('../controllers/hairStyleController');
const service = require('../controllers/serviceController');
const poster = require('../controllers/posterController');
const multer = require("multer");
const upload = multer({ dest: '../uploads/' });
const report = require('../controllers/reportController');
const Appointments = require('../controllers/apptController');

//Customers
router.get('/api/users/getAllCustomers', user.getAllCustomers);
//Mở khóa tài khoản khách hàng
router.put('/api/users/unlockCustomer/:id', user.unlockCustomer);

//Employees
router.get('/api/users/getAllEmployees', user.getAllEmployees);
router.post('/api/users/addEmployee', user.addEmployee);
router.delete('/api/users/deleteEmployee/:id', user.deleteEmployee);
router.put('/api/users/updateEmployee/:id', user.updateEmployee);

//Bài đăng
router.get('/api/posters/getAllPosters', poster.getAllPosters);
router.post('/api/posters/addPoster', poster.addPoster);
router.delete('/api/posters/deletePoster/:id', poster.deletePoster);
router.put('/api/posters/updatePoster/:id', poster.updatePoster);


//Services
router.post('/api/services/addService', service.addService);
router.delete('/api/services/deleteService/:id', service.deleteService);
router.put('/api/services/updateService/:id', service.updateService);


//HairStyles
router.get('/api/hairStyles/getFaceShapes', hairStyle.getFaceShapes);
router.post('/api/hairStyles/addHairStyle', upload.array('hinh_anh_kieu_toc'), hairStyle.addHairStyle);
router.delete('/api/hairStyles/deleteHairStyle/:id', hairStyle.deleteHairStyle);
router.put('/api/hairStyles/updateHairStyle/:id', hairStyle.updateHairStyle);

//Phiếu ĐẶT
router.put('/api/updateAppointment/:id', Appointments.updateAppointment);

//In hóa đơn
router.get('/api/report/exportInvoicePDF/:id', Appointments.exportInvoicePDF);


//Thống kê
//Doanh thu trong 7 ngày gần nhất 
router.get('/api/report/getRevenueIn7Days', report.getRevenueIn7Days);
//Top 5 kiểu tóc được đặt nhiều nhất trong tháng
router.get('/api/report/getTopHairStylesInMonth', report.getTopHairStylesInMonth);
//Top 5 dịch vụ trong tháng
router.get('/api/report/getTopServicesInMonth', report.getTopServicesInMonth);

//Thống kê lịch hẹn hoàn thành, bị hủy, bị lỡ trong tháng
router.get('/api/report/getAppointmentStatusInMonth', report.getAppointmentStatusInMonth);

//Các dịch vụ được đặt trong tháng
//Doanh thu theo tháng
router.get('/api/report/getRevenueByMonth/:year', report.getRevenueByMonth);
router.get('/api/report/getRevenueDataByDateRange/:start/:end', report.getRevenueDataByDateRange);

module.exports = router;