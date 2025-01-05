'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhieuDats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_tai_khoan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaiKhoans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      thoi_gian_hen: {
        type: Sequelize.DATE
      },
      phuong_thuc_thanh_toan: {
        type: Sequelize.STRING
      },
      tong_tien: {
        type: Sequelize.DECIMAL
      },
      trang_thai_lich_hen: {
        type: Sequelize.STRING
      },
      id_nhan_vien: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaiKhoans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      thoi_gian_dat: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.bulkInsert('PhieuDats', [
      {
        id: 1,
        id_tai_khoan: 3,
        thoi_gian_hen: '2024-11-15 10:00:00',
        phuong_thuc_thanh_toan: 'Tiền mặt',
        tong_tien: 500000,
        trang_thai_lich_hen: 'Đã hoàn thành',
        id_nhan_vien: 2,
        thoi_gian_dat: '2024-11-12 09:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_tai_khoan: 4,
        thoi_gian_hen: '2024-11-16 14:00:00',
        phuong_thuc_thanh_toan: 'Chuyển khoản',
        tong_tien: 200000,
        trang_thai_lich_hen: 'Đã hoàn thành',
        id_nhan_vien: 2,
        thoi_gian_dat: '2024-11-12 10:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        id_tai_khoan: 4,
        thoi_gian_hen: '2024-11-17 16:00:00',
        phuong_thuc_thanh_toan: 'Tiền mặt',
        tong_tien: 300000,
        trang_thai_lich_hen: 'Đã hoàn thành',
        id_nhan_vien: 2,
        thoi_gian_dat: '2024-11-12 11:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PhieuDats');
  }
};