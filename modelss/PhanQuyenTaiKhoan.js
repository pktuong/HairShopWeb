// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

class PhanQuyenTaiKhoan extends Model {}

PhanQuyenTaiKhoan.init( {
  id_phan_quyen: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  phan_quyen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PhanQuyenTaiKhoan',
  tableName: 'phan_quyen_tai_khoan',
  timestamps: false,
});

module.exports = PhanQuyenTaiKhoan;