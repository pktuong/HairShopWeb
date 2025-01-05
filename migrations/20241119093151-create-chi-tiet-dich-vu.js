'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietDichVus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_chi_tiet_phieu_dat: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ChiTietPhieuDats',  
          key: 'id',          
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_dich_vu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DichVus',
          key: 'id',
        },        
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      phi_dich_vu: {
        type: Sequelize.DECIMAL
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
    await queryInterface.bulkInsert('ChiTietDichVus', [
      {
        id: 1,
        id_chi_tiet_phieu_dat: 1,
        id_dich_vu: 1,
        phi_dich_vu: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_chi_tiet_phieu_dat: 1,
        id_dich_vu: 2,
        phi_dich_vu: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        id_chi_tiet_phieu_dat: 3,
        id_dich_vu: 2,
        phi_dich_vu: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChiTietDichVus');
  }
};