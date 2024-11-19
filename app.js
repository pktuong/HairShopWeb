const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path');
const  { connection} = require('./config/db');
const expressLayouts = require("express-ejs-layouts");

connection()
// Cấu hình session
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine
// app
//   .set("view engine", "ejs")

///////////////////////////

// Static Files
app.use(express.static(path.join(__dirname, "/static")));

// Set Templating Engine
app
  .use(expressLayouts)
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "/content"));

app.get("/", (req, res) => {
  res.render("index", {
    layout: path.join(__dirname, "/layouts/dashboard"),
    footer: true,
  });
});
////////////////////////////


app.get("/authentication/sign-in", (req, res) => {
  res.render("authentication/sign-in", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

// Sử dụng các route
app.use('/', authRoutes);

// Kiểm tra quyền truy cập vào trang quản trị (Admin hoặc nhân viên)
app.use('/dashboard', (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/authentication/sign-in');
  }
  next();
});

// Trang dashboard sau khi đăng nhập
app.get('/dashboard', (req, res) => {
  res.render("index", {
    layout: path.join(__dirname, "/layouts/dashboard"),
    footer: true,
    hoTen: req.session.hoTen,
    email: req.session.email
  });
});

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

