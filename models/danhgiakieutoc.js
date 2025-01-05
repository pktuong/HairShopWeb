'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhGiaKieuToc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DanhGiaKieuToc.belongsTo(models.TaiKhoan,{
        foreignKey: 'id_khach_hang',
        as: 'TaiKhoanDanhGia',
      })
      DanhGiaKieuToc.belongsTo(models.KieuToc, {
        foreignKey: 'id_kieu_toc',
        as: 'kieuToc',
      });
      DanhGiaKieuToc.belongsTo(models.ChiTietPhieuDat, {
        foreignKey: 'id_chi_tiet_phieu_dat',
        as: 'chiTietPhieuDats',
      });
    }
  }
  DanhGiaKieuToc.init({
    id_khach_hang: DataTypes.INTEGER,
    id_kieu_toc: DataTypes.INTEGER,
    id_chi_tiet_phieu_dat: DataTypes.INTEGER,
    muc_do_hai_long: DataTypes.INTEGER,
    phan_hoi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DanhGiaKieuToc',
  });
  return DanhGiaKieuToc;
};