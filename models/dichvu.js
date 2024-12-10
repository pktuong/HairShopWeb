'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DichVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một dịch vụ có thể xuất hiện trong nhiều chi tiết dịch vụ
      DichVu.hasMany(models.ChiTietDichVu, {
        foreignKey: 'id_dich_vu',
        as: 'CTDV_DV',
      });
    }
  }
  DichVu.init({
    // id_dich_vu: DataTypes.STRING,
    ten_dich_vu: DataTypes.STRING,
    mo_ta: DataTypes.TEXT, 
    hinh_anh: DataTypes.STRING,
    thoi_luong: DataTypes.INTEGER,
    gia_tien: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DichVu',
  });
  return DichVu;
};