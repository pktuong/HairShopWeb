'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietPhieuDat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một chi tiết phiếu đặt thuộc một phiếu đặt
      ChiTietPhieuDat.belongsTo(models.PhieuDat, {
        foreignKey: 'id_phieu_dat',
        as: 'phieuDat',
      });

      // Một chi tiết phiếu đặt thuộc một kiểu tóc
      ChiTietPhieuDat.belongsTo(models.KieuToc, {
        foreignKey: 'id_kieu_toc',
        as: 'kieuToc',
      });

      // Một chi tiết phiếu đặt có thể có nhiều dịch vụ đi kèm
      ChiTietPhieuDat.belongsToMany(models.DichVu, {
        through: models.ChiTietDichVu,
        foreignKey: 'id_chi_tiet_phieu_dat',
        as: 'dichVus',
      });
    }
  }
  ChiTietPhieuDat.init({
    // id_chi_tiet_phieu_dat: DataTypes.STRING,
    id_phieu_dat: DataTypes.INTEGER,
    ten_khach_hang: DataTypes.STRING,
    id_kieu_toc: DataTypes.INTEGER,
    phi_lam_toc: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ChiTietPhieuDat',
  });
  return ChiTietPhieuDat;
};