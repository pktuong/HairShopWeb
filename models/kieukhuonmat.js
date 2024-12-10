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
      // define association here
      KieuKhuonMat.hasMany(models.KieuTocPhuHop, {
        foreignKey: 'id_kieu_khuon_mat',
        as: 'kieu_khuon_mat_phu_hop',
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