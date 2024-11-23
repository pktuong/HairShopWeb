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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChiTietDichVus');
  }
};