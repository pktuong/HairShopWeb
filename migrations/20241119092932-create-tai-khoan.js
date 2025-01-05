'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaiKhoans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ho_ten: {
        type: Sequelize.STRING
      },
      anh_dai_dien: {
        type: Sequelize.STRING
      },
      gioi_tinh: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mat_khau: {
        type: Sequelize.STRING
      },
      so_dien_thoai: {
        type: Sequelize.STRING
      },
      so_lan_vi_pham: {
        type: Sequelize.INTEGER
      },
      id_phan_quyen: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PhanQuyenTaiKhoans',  
          key: 'id',          
        },
        onUpdate: 'CASCADE',  
        onDelete: 'SET NULL',
      },
      trang_thai_tai_khoan: {
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
    await queryInterface.bulkInsert('TaiKhoans', [
      {
        id: 1,
        ho_ten: 'Nguyễn Văn An',
        anh_dai_dien: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1717335000/fs3sel3sashdpngt2pgq.jpg',
        gioi_tinh: 'Nam',
        email: 'a.nguyen@example.com',
        mat_khau: '$2a$10$UW0cW./.qkHOVddMnwyb6uGEKcla8xYNb8Dr8/DQI.1Sz5EsMWu9q',
        so_dien_thoai: '0123456789',
        so_lan_vi_pham: 0,
        id_phan_quyen: 3,
        trang_thai_tai_khoan: 'Hoạt động',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        ho_ten: 'Trần Thị Bình',
        anh_dai_dien: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1717335000/fs3sel3sashdpngt2pgq.jpg',
        gioi_tinh: 'Nữ',
        email: 'b.tran@example.com',
        mat_khau: '$2a$10$UW0cW./.qkHOVddMnwyb6uGEKcla8xYNb8Dr8/DQI.1Sz5EsMWu9q',
        so_dien_thoai: '0987654321',
        so_lan_vi_pham: 1,
        id_phan_quyen: 2,
        trang_thai_tai_khoan: 'Hoạt động',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        ho_ten: 'Lê Văn Cường',
        anh_dai_dien: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1717335000/fs3sel3sashdpngt2pgq.jpg',
        gioi_tinh: 'Nam',
        email: 'c.le@example.com',
        mat_khau: '$2a$10$UW0cW./.qkHOVddMnwyb6uGEKcla8xYNb8Dr8/DQI.1Sz5EsMWu9q',
        so_dien_thoai: '0912345678',
        so_lan_vi_pham: 2,
        id_phan_quyen: 1,
        trang_thai_tai_khoan: 'Hoạt động',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        ho_ten: 'Phạm Thị Dung',
        anh_dai_dien: 'https://res.cloudinary.com/dli4qf7ox/image/upload/v1717335000/fs3sel3sashdpngt2pgq.jpg',
        gioi_tinh: 'Nữ',
        email: 'd.pham@example.com',
        mat_khau: '$2a$10$UW0cW./.qkHOVddMnwyb6uGEKcla8xYNb8Dr8/DQI.1Sz5EsMWu9q',
        so_dien_thoai: '0912345876',
        so_lan_vi_pham: 2,
        id_phan_quyen: 3,
        trang_thai_tai_khoan: 'Hoạt động',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);   

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaiKhoans');
  }
};