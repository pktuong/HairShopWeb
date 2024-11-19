// models/ChiTietPhieuDat.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const PhieuDat = require('./PhieuDat');
const KieuToc = require('./KieuToc');

const ChiTietPhieuDat = sequelize.define('ChiTietPhieuDat', {
  id_chi_tiet_phieu_dat: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_phieu_dat: {
    type: DataTypes.STRING,
    references: {
      model: PhieuDat,
      key: 'id_phieu_dat',
    },
  },
  ten_khach_hang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_kieu_toc: {
    type: DataTypes.STRING,
    references: {
      model: KieuToc,
      key: 'id_kieu_toc',
    },
  },
  phi_lam_toc: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'chi_tiet_phieu_dat',
  timestamps: false,
});

// Thiết lập quan hệ
ChiTietPhieuDat.belongsTo(PhieuDat, { foreignKey: 'id_phieu_dat' });
ChiTietPhieuDat.belongsTo(KieuToc, { foreignKey: 'id_kieu_toc' });

module.exports = ChiTietPhieuDat;
