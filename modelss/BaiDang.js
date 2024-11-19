// models/BaiDang.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const TaiKhoan = require('./TaiKhoan');

const BaiDang = sequelize.define('BaiDang', {
  id_bai_dang: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  tieu_de: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noi_dung: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ngay_dang: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_tai_khoan: {
    type: DataTypes.STRING,
    references: {
      model: TaiKhoan,
      key: 'id_tai_khoan',
    },
  },
  hien_thi: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  hinh_anh: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'bai_dang',
  timestamps: false,
});

// Thiết lập quan hệ
BaiDang.belongsTo(TaiKhoan, { foreignKey: 'id_tai_khoan' });

module.exports = BaiDang;
