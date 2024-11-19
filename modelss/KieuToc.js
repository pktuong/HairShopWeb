// models/KieuToc.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const KieuKhuonMat = require('./KieuKhuonMat');

const KieuToc = sequelize.define('KieuToc', {
  id_kieu_toc: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ten_kieu_toc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hinh_anh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gioi_tinh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mo_ta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_kieu_khuon_mat: {
    type: DataTypes.STRING,
    references: {
      model: KieuKhuonMat,
      key: 'id_kieu_khuon_mat',
    },
  },
  gia_tien: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'kieu_toc',
  timestamps: false,
});

module.exports = KieuToc;
