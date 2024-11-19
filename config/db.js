// require('dotenv').config();
// // const mysql = require('mysql2');
// const { Sequelize } = require('sequelize');


// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   database: 'hair_salon',
// //     port: 3306
// // });

// const sequelize = new Sequelize('hair_salon', 'root', {
//   host: 'localhost',
//   dialect: 'mysql', // hoặc 'postgres', 'sqlite', v.v.
//   port: 3306,
//   logging: false, // Ẩn log query SQL trong console
// });

// // connection.connect((err) => {
// //   if (err) {    
// //     console.error('Kết nối cơ sở dữ liệu thất bại: ', err);
// //   } else {
// //     console.log('Kết nối cơ sở dữ liệu thành công!');
// //   }
// // });

// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Kết nối cơ sở dữ liệu thành công!');
//   } catch (error) {
//     console.error('Kết nối cơ sở dữ liệu thất bại:', error);
//   }
// };

// module.exports = sequelize;
// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// // Khởi tạo kết nối Sequelize
// const sequelize = new Sequelize({
//     username: 'root',
//     host: 'localhost',
//     database: 'hair_salon',
//     port: 3306,
//     dialect: 'mysql',
// });

// const testConnection = async () => { 
//   try {
//     const result = await sequelize.(async (err) => { 

//     })
//   }
// }

// const connection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };

// // Export theo kiểu CommonJS
// module.exports = { sequelize, connection };


require('dotenv').config();
const { Sequelize } = require('sequelize');

// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize({
    username: 'root',
    host: 'localhost',
    database: 'hair_salon',
    port: 3306,
    dialect: 'mysql',
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connection };



