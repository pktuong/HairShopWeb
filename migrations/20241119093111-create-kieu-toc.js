'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo bảng 'KieuTocs'
    await queryInterface.createTable('KieuTocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      ten_kieu_toc: {
        type: Sequelize.STRING
      },
      gioi_tinh: {
        type: Sequelize.STRING
      },
      mo_ta: {
        type: Sequelize.TEXT
      },
      thoi_luong: {
        type: Sequelize.INTEGER
      },
      gia_tien: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Giá trị mặc định
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Giá trị mặc định
      }
    });

    // Thêm dữ liệu mặc định vào bảng 'KieuTocs'
    await queryInterface.bulkInsert('KieuTocs', [
      {
        id: 1,
        ten_kieu_toc: 'Tóc ngắn',
        gioi_tinh: 'Nam',
        mo_ta: 'Kiểu tóc ngắn hiện đại',
        thoi_luong: 50,
        gia_tien: 150000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        ten_kieu_toc: 'Tóc xoăn',
        gioi_tinh: 'Nữ',
        mo_ta: 'Kiểu tóc xoăn bồng bềnh',
        thoi_luong: 60,
        gia_tien: 200000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    // Xóa bảng 'KieuTocs'
    await queryInterface.dropTable('KieuTocs');
  }
};
