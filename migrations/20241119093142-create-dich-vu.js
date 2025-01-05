'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DichVus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      ten_dich_vu: {
        type: Sequelize.STRING
      },
      mo_ta: {
        type: Sequelize.TEXT
      },
      hinh_anh: {
        type: Sequelize.STRING
      },
      thoi_luong: {
        type: Sequelize.INTEGER
      },
      gia_tien: {
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
    await queryInterface.bulkInsert('DichVus', [
      {
        id: 1,
        ten_dich_vu: 'Gội đầu',
        mo_ta: 'Gội đầu và massage da đầu',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1733802054/HairSalon/m9pbidjplyo0kr57wcp2.webp',
        thoi_luong: 30,
        gia_tien: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        ten_dich_vu: 'Nhuộm tóc',
        mo_ta: 'Dịch vụ nhuộm tóc thời trang',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1733802054/HairSalon/m9pbidjplyo0kr57wcp2.webp',
        thoi_luong: 60,
        gia_tien: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DichVus');
  }
};