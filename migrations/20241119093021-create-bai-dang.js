'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaiDangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tieu_de: {
        type: Sequelize.STRING
      },
      noi_dung: {
        type: Sequelize.TEXT
      },
      ngay_dang: {
        type: Sequelize.DATE
      },
      id_tai_khoan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaiKhoans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      hien_thi: {
        type: Sequelize.BOOLEAN
      },
      hinh_anh: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('BaiDangs');
  }
};