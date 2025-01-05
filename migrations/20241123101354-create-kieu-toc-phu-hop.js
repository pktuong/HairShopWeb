'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KieuTocPhuHops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_kieu_khuon_mat: {
        type: Sequelize.INTEGER,
        references: {
          model: 'KieuKhuonMats',  
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
    await queryInterface.bulkInsert('KieuTocPhuHops', [
      {
        id: 1,
        id_kieu_khuon_mat: 1,
        id_kieu_toc: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_kieu_khuon_mat: 2,
        id_kieu_toc: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        id_kieu_khuon_mat: 1,
        id_kieu_toc: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KieuTocPhuHops');
  }
};