// models/KieuTocYeuThich.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const TaiKhoan = require('./TaiKhoan');
const KieuToc = require('./KieuToc');

const KieuTocYeuThich = sequelize.define('KieuTocYeuThich', {
  id_tai_khoan: {
    type: DataTypes.STRING,
    references: {
      model: TaiKhoan,
      key: 'id_tai_khoan',
    },
    primaryKey: true,
  },
  id_kieu_toc: {
    type: DataTypes.STRING,
    references: {
      model: KieuToc,
      key: 'id_kieu_toc',
    },
    primaryKey: true,
  },
}, {
  tableName: 'kieu_toc_yeu_thich',
  timestamps: false,
});

// Thiết lập quan hệ
KieuTocYeuThich.belongsTo(TaiKhoan, { foreignKey: 'id_tai_khoan' });
KieuTocYeuThich.belongsTo(KieuToc, { foreignKey: 'id_kieu_toc' });

module.exports = KieuTocYeuThich;
