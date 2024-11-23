'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KieuTocYeuThich extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KieuTocYeuThich.init({
    id_tai_khoan: DataTypes.INTEGER,
    id_kieu_toc: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KieuTocYeuThich',
  });
  return KieuTocYeuThich;
};