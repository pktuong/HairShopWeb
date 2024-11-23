// routes/authRoutes.js
const Router = require("express");
const router = Router();

const hairStyles = require('../controllers/hairStyleController');

router.get('/api/customers/getAllHairStyles', hairStyles.getAllHairStyles);

module.exports = router;
