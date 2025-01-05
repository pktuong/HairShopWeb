'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DanhGiaKieuTocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_khach_hang: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaiKhoans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
      id_chi_tiet_phieu_dat: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ChiTietPhieuDats',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      muc_do_hai_long: {
        type: Sequelize.INTEGER
      },
      phan_hoi: {
        type: Sequelize.TEXT
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
    await queryInterface.bulkInsert('DanhGiaKieuTocs', [
      {
        id: 1,
        id_khach_hang: 3,
        id_kieu_toc: 1,
        id_chi_tiet_phieu_dat: 1,
        muc_do_hai_long: 5,
        phan_hoi: 'Rất hài lòng với kiểu tóc này',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_khach_hang: 4,
        id_kieu_toc: 2,
        id_chi_tiet_phieu_dat: 2,
        muc_do_hai_long: 4,
        phan_hoi: 'Hơi hài lòng với kiểu tóc này',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        id_khach_hang: 4,
        id_kieu_toc: 2,
        id_chi_tiet_phieu_dat: 3,
        muc_do_hai_long: 3,
        phan_hoi: 'Bình thường',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DanhGiaKieuTocs');
  }
};