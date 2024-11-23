'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaiKhoans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ho_ten: {
        type: Sequelize.STRING
      },
      anh_dai_dien: {
        type: Sequelize.STRING
      },
      gioi_tinh: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mat_khau: {
        type: Sequelize.STRING
      },
      so_dien_thoai: {
        type: Sequelize.STRING
      },
      so_lan_vi_pham: {
        type: Sequelize.INTEGER
      },
      id_phan_quyen: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PhanQuyenTaiKhoans',  
          key: 'id',          
        },
        onUpdate: 'CASCADE',  
        onDelete: 'SET NULL',
      },
      trang_thai_tai_khoan: {
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
    await queryInterface.dropTable('TaiKhoans');
  }
};