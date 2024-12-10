// routes/authRoutes.js
const Router = require("express");
const router = Router();
const user = require('../controllers/userController');
const hairStyle = require('../controllers/hairStyleController');
const service = require('../controllers/serviceController');
const multer = require("multer");
const upload = multer({ dest: '../uploads/' });

//Customers
router.get('/api/users/getAllCustomers', user.getAllCustomers);

//Employees
router.get('/api/users/getAllEmployees', user.getAllEmployees);
router.post('/api/users/addEmployee', user.addEmployee);
router.delete('/api/users/deleteEmployee/:id', user.deleteEmployee);
router.put('/api/users/updateEmployee/:id', user.updateEmployee);

//Services
router.post('/api/services/addService', service.addService);
router.delete('/api/services/deleteService/:id', service.deleteService);

//HairStyles
router.get('/api/hairStyles/getFaceShapes', hairStyle.getFaceShapes);
router.post('/api/hairStyles/addHairStyle', upload.array('hinh_anh_kieu_toc'), hairStyle.addHairStyle);
router.delete('/api/hairStyles/deleteHairStyle/:id', hairStyle.deleteHairStyle);
router.put('/api/hairStyles/updateHairStyle/:id', hairStyle.updateHairStyle);

module.exports = router;