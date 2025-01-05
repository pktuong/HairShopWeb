'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaiDangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tieu_de: {
        type: Sequelize.STRING
      },
      noi_dung: {
        type: Sequelize.TEXT
      },
      ngay_dang: {
        type: Sequelize.DATE
      },
      id_tai_khoan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaiKhoans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      hien_thi: {
        type: Sequelize.BOOLEAN
      },
      hinh_anh: {
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
    
    await queryInterface.bulkInsert('BaiDangs', [
      {
        id: 1,
        tieu_de: 'Giảm giá 20%',
        noi_dung: 'Giảm giá 20% cho tất cả các dịch vụ',
        ngay_dang: '2024-11-12',
        id_tai_khoan: 3,
        hien_thi: true,
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1734323610/HairSalon/Banner/emgrxwykeapvipuroh8c.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        tieu_de: 'Kiểu tóc mới',
        noi_dung: 'Giới thiệu các kiểu tóc mới',
        ngay_dang: '2024-11-10',
        id_tai_khoan: 2,
        hien_thi: true,
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1734323676/HairSalon/Banner/uxjjrzm4tdzapstn2wwa.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BaiDangs');
  }
};