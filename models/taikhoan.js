'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một tài khoản có một quyền
      TaiKhoan.belongsTo(models.PhanQuyenTaiKhoan, {
        foreignKey: 'id_phan_quyen',
        as: 'phanQuyen',
      });

      // Một tài khoản có thể tạo nhiều bài đăng
      TaiKhoan.hasMany(models.BaiDang, {
        foreignKey: 'id_tai_khoan',
        as: 'baiDangs',
      });

      // Một tài khoản có thể đặt nhiều phiếu đặt
      TaiKhoan.hasMany(models.PhieuDat, {
        foreignKey: 'id_tai_khoan',
        as: 'phieuDats',
      });

      // Một tài khoản có thể được phân công làm nhân viên cho nhiều phiếu đặt
      TaiKhoan.hasMany(models.PhieuDat, {
        foreignKey: 'id_nhan_vien',
        as: 'phieuNhanViens',
      });

      // Một tài khoản có thể thích nhiều kiểu tóc
      TaiKhoan.belongsToMany(models.KieuToc, {
        through: models.KieuTocYeuThich,
        foreignKey: 'id_tai_khoan',
        as: 'kieuTocYeuThichs',
      });

      // Một tài khoản có thể đánh giá nhiều dịch vụ
      TaiKhoan.hasMany(models.DanhGiaDichVu, {
        foreignKey: 'id_khach_hang',
        as: 'danhGiaDichVus',
      });

      // Một tài khoản có thể đánh giá nhiều kiểu tóc
      TaiKhoan.hasMany(models.DanhGiaKieuToc, {
        foreignKey: 'id_khach_hang',
        as: 'danhGiaKieuTocs',
      });
    }
  }
  TaiKhoan.init({
    // id_tai_khoan: DataTypes.STRING,
    ho_ten: DataTypes.STRING,
    anh_dai_dien: DataTypes.STRING,
    gioi_tinh: DataTypes.STRING,
    email: DataTypes.STRING,
    mat_khau: DataTypes.STRING,
    so_dien_thoai: DataTypes.STRING,
    so_lan_vi_pham: DataTypes.INTEGER,
    id_phan_quyen: DataTypes.INTEGER,
    trang_thai_tai_khoan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaiKhoan',
  });
  return TaiKhoan;
};