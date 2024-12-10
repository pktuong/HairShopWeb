// routes/authRoutes.js
const Router = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({ dest: '../uploads/' });

const hairStyles = require('../controllers/hairStyleController');
const Appointments = require('../controllers/apptController');
const Images = require('../controllers/imageController');
const Services = require('../controllers/serviceController');

router.get('/api/customers/getAllHairStyles', hairStyles.getAllHairStyles);

router.post('/api/upload/Images', upload.array('images', 10), Images.uploadImages);

router.get('/api/getApptByDate/:date', Appointments.getApptByDate);

router.get('/api/getFreeTime/:date', Appointments.getFreeTime);

router.get('/api/services/getAllServices', Services.getAllServices);
module.exports = router;
