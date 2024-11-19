// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

class TaiKhoan extends Model {}

TaiKhoan.init(
  {
  id_tai_khoan: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ho_ten: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anh_dai_dien: {
    type: DataTypes.STRING,
  },
  gioi_tinh: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mat_khau: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  so_dien_thoai: {
    type: DataTypes.STRING,
  },
  so_lan_vi_pham: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  id_phan_quyen: {
    type: DataTypes.STRING,
  },
  trang_thai_tai_khoan: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'tai_khoan',
  tableName: 'tai_khoan',
  timestamps: false,
});

module.exports = TaiKhoan;
