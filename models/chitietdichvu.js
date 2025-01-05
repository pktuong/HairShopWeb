'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietDichVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một chi tiết dịch vụ thuộc một chi tiết phiếu đặt
      ChiTietDichVu.belongsTo(models.ChiTietPhieuDat, {
        foreignKey: 'id_chi_tiet_phieu_dat',
        as: 'chiTietPhieuDats',
      });

      // Một chi tiết dịch vụ thuộc một dịch vụ
      ChiTietDichVu.belongsTo(models.DichVu, {
        foreignKey: 'id_dich_vu',
        as: 'CTDV_DV',
      });

      // Một chi tiết dịch vụ có thể được đánh giá bởi nhiều khách hàng
      ChiTietDichVu.hasMany(models.DanhGiaDichVu, {
        foreignKey: 'id_chi_tiet_dich_vu',
        as: 'DanhGiaDichVus',
      });
    }
  }
  ChiTietDichVu.init({
    id_chi_tiet_phieu_dat: DataTypes.INTEGER,
    id_dich_vu: DataTypes.INTEGER,
    phi_dich_vu: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'ChiTietDichVu',
  });
  return ChiTietDichVu;
};