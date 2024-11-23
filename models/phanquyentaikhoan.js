'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhanQuyenTaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhanQuyenTaiKhoan.hasMany(models.TaiKhoan, {
        foreignKey: 'id_phan_quyen',
        as: 'taiKhoans',
      });
    }
  }
  PhanQuyenTaiKhoan.init({
    // id_phan_quyen: DataTypes.STRING,
    phan_quyen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhanQuyenTaiKhoan',
  });
  return PhanQuyenTaiKhoan;
};