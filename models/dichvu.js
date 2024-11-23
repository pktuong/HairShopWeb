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
      // Một dịch vụ có thể xuất hiện trong nhiều chi tiết phiếu đặt
      DichVu.belongsToMany(models.ChiTietPhieuDat, {
        through: models.ChiTietDichVu,
        foreignKey: 'id_dich_vu',
        as: 'chiTietPhieuDats',
      });
    }
  }
  DichVu.init({
    // id_dich_vu: DataTypes.STRING,
    ten_dich_vu: DataTypes.STRING,
    mo_ta: DataTypes.TEXT,
    gia_tien: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DichVu',
  });
  return DichVu;
};