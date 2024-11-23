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
      // define association here
    }
  }
  ChiTietDichVu.init({
    id_chi_tiet_phieu_dat: DataTypes.INTEGER,
    id_dich_vu: DataTypes.INTEGER,
    phi_dich_vu: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ChiTietDichVu',
  });
  return ChiTietDichVu;
};