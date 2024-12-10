'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KieuToc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một kiểu tóc thuộc một kiểu khuôn mặt

      KieuToc.hasMany(models.ChiTietPhieuDat, {
        foreignKey: 'id_kieu_toc',
        as: 'chiTietPhieuDats',
      });

      KieuToc.belongsToMany(models.TaiKhoan, {
        through: models.KieuTocYeuThich,
        foreignKey: 'id_kieu_toc',
        as: 'tai_khoan',
      });

      // Add the reverse association for HinhAnhKieuToc
      KieuToc.hasMany(models.HinhAnhKieuToc, {
        foreignKey: 'id_kieu_toc',
        as: 'hinh_anh_kieu_toc',
      });

      // Add the reverse association for KieuTocPhuHop
      KieuToc.hasMany(models.KieuTocPhuHop, {
        foreignKey: 'id_kieu_toc',
        as: 'kieu_toc_phu_hop',
      });
    }
  }
  KieuToc.init({
    // id_kieu_toc: DataTypes.STRING,
    ten_kieu_toc: DataTypes.STRING,
    gioi_tinh: DataTypes.STRING,
    mo_ta: DataTypes.TEXT,
    thoi_luong: DataTypes.INTEGER,
    gia_tien: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'KieuToc',
  });
  return KieuToc;
};