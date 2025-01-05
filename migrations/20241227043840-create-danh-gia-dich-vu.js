'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DanhGiaDichVus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      id_dich_vu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DichVus',
          key: 'id',
        },        
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_chi_tiet_dich_vu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ChiTietDichVus',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      muc_do_hai_long: {
        type: Sequelize.INTEGER
      },
      phan_hoi: {
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
    await queryInterface.bulkInsert('DanhGiaDichVus', [
      {
        id: 1,
        id_khach_hang: 3,
        id_dich_vu: 1,
        id_chi_tiet_dich_vu: 1,
        muc_do_hai_long: 5,
        phan_hoi: 'Rất tốt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_khach_hang: 3,
        id_dich_vu: 2,
        id_chi_tiet_dich_vu: 2,
        muc_do_hai_long: 4,
        phan_hoi: 'Tốt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        id_khach_hang: 4,
        id_dich_vu: 2,
        id_chi_tiet_dich_vu: 3,
        muc_do_hai_long: 3,
        phan_hoi: 'Bình thường',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DanhGiaDichVus');
  }
};