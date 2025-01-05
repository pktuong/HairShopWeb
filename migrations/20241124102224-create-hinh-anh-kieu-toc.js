'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HinhAnhKieuTocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_kieu_toc: {
        type: Sequelize.INTEGER,
        references: {
          model: 'KieuTocs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'        
      },
      url_anh: {
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
    await queryInterface.bulkInsert('HinhAnhKieuTocs', [
      {
        id: 1,
        id_kieu_toc: 1,
        url_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732188444/pd9mjwwtd0mn6tuz2r1u.jpg'
      },
      {
        id: 2,
        id_kieu_toc: 1,
        url_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732188444/pd9mjwwtd0mn6tuz2r1u.jpg'
      },
      {
        id: 3,
        id_kieu_toc: 2,
        url_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732188444/pd9mjwwtd0mn6tuz2r1u.jpg'
      },
      {
        id: 4,
        id_kieu_toc: 2,
        url_anh: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1732188444/pd9mjwwtd0mn6tuz2r1u.jpg'
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HinhAnhKieuTocs');
  }
};