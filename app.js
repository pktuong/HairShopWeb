const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path');
const  { connection} = require('./config/db');
const expressLayouts = require("express-ejs-layouts");
const axios = require("axios");

connection()
// Cấu hình session
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));


// Static Files
app.use(express.static(path.join(__dirname, "/static")));

// Set Templating Engine
app
  .use(expressLayouts)
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "/content"));

////////////////////////////


app.get("/authentication/sign-in", (req, res) => {
  res.render("authentication/sign-in", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false, 
  });
});

// Sử dụng các route
app.use(authRoutes);
app.use(require('./routes/customerRoutes'));
app.use(require('./routes/adminRoutes'));

// Kiểm tra quyền truy cập vào trang quản trị (Admin hoặc nhân viên)
app.use('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/authentication/sign-in');
  }
  next();
});

// Trang dashboard sau khi đăng nhập
app.get('/', (req, res) => {
  res.render("index", {
    layout: path.join(__dirname, "/layouts/dashboard"),
    footer: true,
    hoTen: req.session.hoTen,
    email: req.session.email
  });
});
///////////////////////////////////////////

app.get("/settings", (req, res) => {
  res.render("settings", {
    layout: path.join(__dirname, "/layouts/dashboard"),
    footer: true,
  });
});

app.get("/authentication/forgot-password", (req, res) => {
  res.render("authentication/forgot-password", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/authentication/profile-lock", (req, res) => {
  res.render("authentication/profile-lock", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/authentication/sign-in", (req, res) => {
  res.render("authentication/sign-in", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/authentication/sign-up", (req, res) => {
  res.render("authentication/sign-up", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/authentication/reset-password", (req, res) => {
  res.render("authentication/reset-password", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/crud/products", async (req, res) => {
  // const products = require("./data/products.json");
  // res.render("crud/products", {
  //   layout: path.join(__dirname, "/layouts/dashboard"),
  //   footer: false,
  //   products,
  // });
  try {
    // Gọi API để lấy danh sách sản phẩm
    const response = await axios.get("http://localhost:3000/api/customers/getAllHairStyles");
    const products = response.data.data; // Lấy dữ liệu sản phẩm

    // Kiểm tra nếu có dữ liệu sản phẩm
    if (products && products.length > 0) {
      // Nếu có dữ liệu, render trang và truyền dữ liệu
      res.render("crud/products", {
        layout: path.join(__dirname, "/layouts/dashboard"),
        footer: false,
        products,
      });
    } else {
      res.redirect('/pages/404');
    }
  }
  catch (error) {
    console.error("Lỗi khi gọi API:", error.message);
    res.redirect('/pages/404');
  }
});

app.get("/crud/users", async (req, res) => { 
    try {
      // Gọi API để lấy danh sách users
      const response = await axios.get("http://localhost:3000/api/users/getAllCustomers");
    const customers = response.data.data; // Lấy dữ liệu khách hàng


    // Kiểm tra nếu có dữ liệu khách hàng
    if (customers && customers.length > 0) {
      // Nếu có dữ liệu, render trang và truyền dữ liệu
      res.render("crud/users", {
        layout: path.join(__dirname, "/layouts/dashboard"),
        footer: false,
        users: customers,        
      });
    } else {
      res.redirect('/pages/404');
    }

  } catch (error) {
    console.error("Lỗi khi gọi API:", error.message);
    res.redirect('/pages/404');
  }
});
app.get("/layouts/stacked", (req, res) => {
  res.render("layouts/stacked", {
    layout: path.join(__dirname, "/layouts/stacked-layout"),
    footer: true,
  });
});

app.get("/layouts/sidebar", (req, res) => {
  res.render("layouts/sidebar", {
    layout: path.join(__dirname, "/layouts/dashboard"),
    footer: true,
  });
});

app.get("/pages/404", (req, res) => {
  res.render("pages/404", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/pages/500", (req, res) => {
  res.render("pages/500", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/pages/maintenance", (req, res) => {
  res.render("pages/maintenance", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: false,
    footer: false,
  });
});

app.get("/pages/pricing", (req, res) => {
  res.render("pages/pricing", {
    layout: path.join(__dirname, "/layouts/main"),
    navigation: true,
    footer: false,
  });
});

app.get("/playground/sidebar", (req, res) => {
  res.render("playground/sidebar", {
    layout: path.join(__dirname, "/layouts/dashboard"),
    footer: true,
  });
});

app.get("/playground/stacked", (req, res) => {
  res.render("playground/stacked", {
    layout: path.join(__dirname, "/layouts/stacked-layout"),
    footer: true,
  });
});


// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

