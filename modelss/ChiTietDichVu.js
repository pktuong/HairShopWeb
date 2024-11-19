// models/ChiTietDichVu.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const ChiTietPhieuDat = require('./ChiTietPhieuDat');
const DichVu = require('./DichVu');

const ChiTietDichVu = sequelize.define('ChiTietDichVu', {
  id_chi_tiet_phieu_dat: {
    type: DataTypes.STRING,
    references: {
      model: ChiTietPhieuDat,
      key: 'id_chi_tiet_phieu_dat',
    },
    primaryKey: true,
  },
  id_dich_vu: {
    type: DataTypes.STRING,
    references: {
      model: DichVu,
      key: 'id_dich_vu',
    },
    primaryKey: true,
  },
  phi_dich_vu: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'chi_tiet_dich_vu',
  timestamps: false,
});

// Thiết lập quan hệ
ChiTietDichVu.belongsTo(ChiTietPhieuDat, { foreignKey: 'id_chi_tiet_phieu_dat' });
ChiTietDichVu.belongsTo(DichVu, { foreignKey: 'id_dich_vu' });

module.exports = ChiTietDichVu;
