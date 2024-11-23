'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KieuToc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một kiểu tóc thuộc một kiểu khuôn mặt
      KieuToc.belongsTo(models.KieuKhuonMat, {
        foreignKey: 'id_kieu_khuon_mat',
        as: 'kieuKhuonMat',
      });

      // Một kiểu tóc có thể xuất hiện trong nhiều phiếu đặt
      KieuToc.hasMany(models.ChiTietPhieuDat, {
        foreignKey: 'id_kieu_toc',
        as: 'chiTietPhieuDats',
      });

      // Một kiểu tóc có thể được nhiều tài khoản yêu thích
      KieuToc.belongsToMany(models.TaiKhoan, {
        through: models.KieuTocYeuThich,
        foreignKey: 'id_kieu_toc',
        as: 'taiKhoansYeuThich',
      });
    }
  }
  KieuToc.init({
    // id_kieu_toc: DataTypes.STRING,
    ten_kieu_toc: DataTypes.STRING,
    hinh_anh: DataTypes.STRING,
    gioi_tinh: DataTypes.STRING,
    mo_ta: DataTypes.TEXT,
    id_kieu_khuon_mat: DataTypes.INTEGER,
    gia_tien: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'KieuToc',
  });
  return KieuToc;
};