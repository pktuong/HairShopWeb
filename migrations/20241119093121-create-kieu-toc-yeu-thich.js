'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KieuTocYeuThiches', {
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
      id_kieu_toc: {
        type: Sequelize.INTEGER,
        references: {
          model: 'KieuTocs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('KieuTocYeuThiches');
  }
};