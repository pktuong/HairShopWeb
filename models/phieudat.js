'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuDat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một phiếu đặt có nhiều chi tiết phiếu đặt
      PhieuDat.hasMany(models.ChiTietPhieuDat, {
        foreignKey: 'id_phieu_dat',
        as: 'chiTietPhieuDats',
      });
    }
  }
  PhieuDat.init({
    // id_phieu_dat: DataTypes.STRING,
    id_tai_khoan: DataTypes.INTEGER,
    thoi_gian_hen: DataTypes.DATE,
    phuong_thuc_thanh_toan: DataTypes.STRING,
    tong_tien: DataTypes.DECIMAL,
    trang_thai_lich_hen: DataTypes.STRING,
    trang_thai_thanh_toan: DataTypes.STRING,
    id_nhan_vien: DataTypes.INTEGER,
    thoi_gian_dat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PhieuDat',
  });
  return PhieuDat;
};