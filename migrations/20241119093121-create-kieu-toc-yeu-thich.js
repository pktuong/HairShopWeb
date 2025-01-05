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
    await queryInterface.bulkInsert('KieuTocYeuThiches', [
      {
        id: 1,
        id_tai_khoan: 1,
        id_kieu_toc: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_tai_khoan: 1,
        id_kieu_toc: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KieuTocYeuThiches');
  }
};