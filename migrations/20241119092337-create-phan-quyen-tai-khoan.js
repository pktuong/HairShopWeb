'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhanQuyenTaiKhoans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phan_quyen: {
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
    await queryInterface.bulkInsert('PhanQuyenTaiKhoans', [
      {
        id: 1,
        phan_quyen: 'Quản trị viên',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        phan_quyen: 'Nhân viên',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        phan_quyen: 'Khách hàng',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PhanQuyenTaiKhoans');
  }
};