'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaiDang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một bài đăng thuộc về một tài khoản
      BaiDang.belongsTo(models.TaiKhoan, {
        foreignKey: 'id_tai_khoan',
        as: 'taiKhoan',
      });

    }
  }
  BaiDang.init({
    // id_bai_dang: DataTypes.STRING,
    tieu_de: DataTypes.STRING,
    noi_dung: DataTypes.TEXT,
    ngay_dang: DataTypes.DATE,
    id_tai_khoan: DataTypes.INTEGER,
    hien_thi: DataTypes.BOOLEAN,
    hinh_anh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BaiDang',
  });
  return BaiDang;
};