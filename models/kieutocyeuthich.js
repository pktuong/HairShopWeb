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
      
      // Một tài khoản có thể thích nhiều kiểu tóc
      KieuTocYeuThich.belongsTo(models.TaiKhoan, {
        foreignKey: 'id_tai_khoan',
        as: 'tai_khoan',
      });

      // Một kiểu tóc có thể được thích bởi nhiều tài khoản
      KieuTocYeuThich.belongsTo(models.KieuToc, {
        foreignKey: 'id_kieu_toc',
        as: 'kieu_toc',
      });

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