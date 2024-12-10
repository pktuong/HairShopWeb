'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HinhAnhKieuToc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HinhAnhKieuToc.belongsTo(models.KieuToc, {
        foreignKey: 'id_kieu_toc',
        as: 'hinh_anh_kieu_toc'
      });

    }
  }
  HinhAnhKieuToc.init({
    id_kieu_toc: DataTypes.INTEGER,
    url_anh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HinhAnhKieuToc',
  });
  return HinhAnhKieuToc;
};