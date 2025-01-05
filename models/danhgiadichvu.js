'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhGiaDichVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      DanhGiaDichVu.belongsTo(models.TaiKhoan,{
        foreignKey: 'id_khach_hang',
        as: 'TaiKhoanDanhGia',
      })
      DanhGiaDichVu.belongsTo(models.DichVu, {
        foreignKey: 'id_dich_vu',
        as: 'dich_vu',
      });
      DanhGiaDichVu.belongsTo(models.ChiTietDichVu, {
        foreignKey: 'id_chi_tiet_dich_vu',
        as: 'chi_tiet_dich_vu',
      });
    }
  }
  DanhGiaDichVu.init({
    id_khach_hang: DataTypes.INTEGER,
    id_dich_vu: DataTypes.INTEGER,
    id_chi_tiet_dich_vu: DataTypes.INTEGER,
    muc_do_hai_long: DataTypes.INTEGER,
    phan_hoi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DanhGiaDichVu',
  });
  return DanhGiaDichVu;
};