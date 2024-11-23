'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KieuTocPhuHop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KieuTocPhuHop.init({
    id_kieu_khuon_mat: DataTypes.INTEGER,
    id_kieu_toc: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KieuTocPhuHop',
  });
  return KieuTocPhuHop;
};