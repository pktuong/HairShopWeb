'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KieuKhuonMats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      kieu_khuon_mat: {
        type: Sequelize.STRING
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
    await queryInterface.bulkInsert('KieuKhuonMats', [
      {
        id: 1,
        kieu_khuon_mat: 'Mặt tròn',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732507304/FaceShapes/vq8q4ukajxdohnfn7pri.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        kieu_khuon_mat: 'Mặt vuông',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732507304/FaceShapes/k0y8mbztgbs0kirh81rc.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        kieu_khuon_mat: 'Mặt trái xoan',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732507304/FaceShapes/ilm0f9mnkqsko0zwlwjv.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        kieu_khuon_mat: 'Mặt dài',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732507304/FaceShapes/ilev5qbgvlpalyneggcz.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        kieu_khuon_mat: 'Mặt trái tim',
        hinh_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732507304/FaceShapes/nscnp6dr2gpywh8x3baa.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KieuKhuonMats');
  }
};