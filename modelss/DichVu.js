// models/DichVu.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const DichVu = sequelize.define('DichVu', {
  id_dich_vu: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ten_dich_vu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mo_ta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gia_tien: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'dich_vu',
  timestamps: false,
});

module.exports = DichVu;
