// models/KieuKhuonMat.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const KieuKhuonMat = sequelize.define('KieuKhuonMat', {
  id_kieu_khuon_mat: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  kieu_khuon_mat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hinh_anh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'kieu_khuon_mat',
  timestamps: false,
});

module.exports = KieuKhuonMat;
