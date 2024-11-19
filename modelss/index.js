// const sequelize = require('./index');
const sequelize = require('../config/db');
// Import từng model
const PhanQuyenTaiKhoan = require('./PhanQuyenTaiKhoan');
const TaiKhoan = require('./TaiKhoan');
const BaiDang = require('./BaiDang');
const KieuKhuonMat = require('./KieuKhuonMat');
const KieuToc = require('./KieuToc');
const PhieuDat = require('./PhieuDat');
const ChiTietPhieuDat = require('./ChiTietPhieuDat');
const DichVu = require('./DichVu');
const ChiTietDichVu = require('./ChiTietDichVu');
const KieuTocYeuThich = require('./KieuTocYeuThich');

// Định nghĩa các quan hệ giữa models
const setupAssociations = () => {
  TaiKhoan.belongsTo(PhanQuyenTaiKhoan, { foreignKey: 'id_phan_quyen' });
  PhanQuyenTaiKhoan.hasMany(TaiKhoan, { foreignKey: 'id_phan_quyen' });

  BaiDang.belongsTo(TaiKhoan, { foreignKey: 'id_tai_khoan' });
  TaiKhoan.hasMany(BaiDang, { foreignKey: 'id_tai_khoan' });

  KieuToc.belongsTo(KieuKhuonMat, { foreignKey: 'id_kieu_khuon_mat' });
  KieuKhuonMat.hasMany(KieuToc, { foreignKey: 'id_kieu_khuon_mat' });

  PhieuDat.belongsTo(TaiKhoan, { foreignKey: 'id_tai_khoan' });
  TaiKhoan.hasMany(PhieuDat, { foreignKey: 'id_tai_khoan' });

  ChiTietPhieuDat.belongsTo(PhieuDat, { foreignKey: 'id_phieu_dat' });
  PhieuDat.hasMany(ChiTietPhieuDat, { foreignKey: 'id_phieu_dat' });

  ChiTietPhieuDat.belongsTo(KieuToc, { foreignKey: 'id_kieu_toc' });
  KieuToc.hasMany(ChiTietPhieuDat, { foreignKey: 'id_kieu_toc' });

  ChiTietDichVu.belongsTo(ChiTietPhieuDat, { foreignKey: 'id_chi_tiet_phieu_dat' });
  ChiTietPhieuDat.hasMany(ChiTietDichVu, { foreignKey: 'id_chi_tiet_phieu_dat' });

  ChiTietDichVu.belongsTo(DichVu, { foreignKey: 'id_dich_vu' });
  DichVu.hasMany(ChiTietDichVu, { foreignKey: 'id_dich_vu' });

  KieuTocYeuThich.belongsTo(TaiKhoan, { foreignKey: 'id_tai_khoan' });
  TaiKhoan.hasMany(KieuTocYeuThich, { foreignKey: 'id_tai_khoan' });

  KieuTocYeuThich.belongsTo(KieuToc, { foreignKey: 'id_kieu_toc' });
  KieuToc.hasMany(KieuTocYeuThich, { foreignKey: 'id_kieu_toc' });
};

// Gọi hàm liên kết
setupAssociations();

// Export tất cả models
module.exports = {
  sequelize,
  PhanQuyenTaiKhoan,
  TaiKhoan,
  BaiDang,
  KieuKhuonMat,
  KieuToc,
  PhieuDat,
  ChiTietPhieuDat,
  DichVu,
  ChiTietDichVu,
  KieuTocYeuThich,
};
