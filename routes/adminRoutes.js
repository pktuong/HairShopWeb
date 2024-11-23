// routes/authRoutes.js
const Router = require("express");
const router = Router();
const user = require('../controllers/userController');

router.get('/api/users/getAllCustomers', user.getAllCustomers);

router.get('/api/users/getAllEmployees', user.getAllEmployees);

module.exports = router;