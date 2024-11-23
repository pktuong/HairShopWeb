'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KieuKhuonMat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một kiểu khuôn mặt có nhiều kiểu tóc
      KieuKhuonMat.hasMany(models.KieuToc, {
        foreignKey: 'id_kieu_khuon_mat',
        as: 'kieuTocs',
      });
    }
  }
  KieuKhuonMat.init({
    // id_kieu_khuon_mat: DataTypes.STRING,
    kieu_khuon_mat: DataTypes.STRING,
    hinh_anh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KieuKhuonMat',
  });
  return KieuKhuonMat;
};