// models/PhieuDat.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const TaiKhoan = require('./TaiKhoan');

const PhieuDat = sequelize.define('PhieuDat', {
  id_phieu_dat: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_tai_khoan: {
    type: DataTypes.STRING,
    references: {
      model: TaiKhoan,
      key: 'id_tai_khoan',
    },
  },
  thoi_gian_hen: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  phuong_thuc_thanh_toan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tong_tien: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  trang_thai_lich_hen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  trang_thai_thanh_toan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_nhan_vien: {
    type: DataTypes.STRING,
    references: {
      model: TaiKhoan,
      key: 'id_tai_khoan',
    },
  },
  thoi_gian_dat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'phieu_dat',
  timestamps: false,
});

// Thiết lập quan hệ
PhieuDat.belongsTo(TaiKhoan, { as: 'khachHang', foreignKey: 'id_tai_khoan' });
PhieuDat.belongsTo(TaiKhoan, { as: 'nhanVien', foreignKey: 'id_nhan_vien' });

module.exports = PhieuDat;
