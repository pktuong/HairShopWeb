'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietPhieuDats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_phieu_dat: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PhieuDats',  
          key: 'id',          
        },
        onUpdate: 'CASCADE',  
        onDelete: 'SET NULL',
      },
      ten_khach_hang: {
        type: Sequelize.STRING
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
      phi_lam_toc: {
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
    await queryInterface.bulkInsert('ChiTietPhieuDats', [
      {
        id: 1,
        id_phieu_dat: 1,
        ten_khach_hang: 'Lê Văn Cường',
        id_kieu_toc: 1,
        phi_lam_toc: 150000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_phieu_dat: 2,
        ten_khach_hang: 'Phạm Thị Dung',
        id_kieu_toc: 2,
        phi_lam_toc: 200000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      {
        id: 3,
        id_phieu_dat: 3,
        ten_khach_hang: 'Phạm Thị Dung',
        id_kieu_toc: 2,
        phi_lam_toc: 200000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChiTietPhieuDats');
  }
};