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
      trang_thai_thanh_toan: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PhieuDats');
  }
};