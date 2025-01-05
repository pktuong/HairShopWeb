const db = require("../config/db");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs");
const { KieuToc } = require("../models");
const { KieuKhuonMat } = require("../models");
const { KieuTocPhuHop } = require("../models");
const { HinhAnhKieuToc } = require("../models");
const { KieuTocYeuThich } = require("../models");
const { DanhGiaKieuToc } = require("../models");
const { TaiKhoan } = require("../models");

// Lấy danh sách kiểu tóc kèm hình ảnh và kiểu khuôn mặt phù hợp
exports.getAllHairStyles = async (req, res) => {
  try {
    const hairStyles = await KieuToc.findAll({
      include: [
        {
          model: HinhAnhKieuToc,
          as: "hinh_anh_kieu_toc",
        },
        {
          model: DanhGiaKieuToc,
          as: "danh_gia_kieu_toc",
        },
        {
          model: KieuTocPhuHop,
          as: "kieu_toc_phu_hop",
          include: [
            {
              model: KieuKhuonMat,
              as: "kieu_khuon_mat_phu_hop",
            },
          ],
        },
      ],
    });
    console.log("====================================");
    //in ra kieu_toc_phu_hop
    // console.log(
    //   hairStyles[0].kieu_toc_phu_hop[0].dataValues.kieu_khuon_mat_phu_hop
    // );
    res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: hairStyles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

//Lấy kiểu tóc theo id
exports.getHairStyleById = async (req, res) => {
  try {
    const { id } = req.params;
    const hairStyle = await KieuToc.findOne({
      where: {
        id:id,
      },
      include: [
        {
          model: HinhAnhKieuToc,
          as: "hinh_anh_kieu_toc",
          attributes: ["id","url_anh"],
        },
        {
          model: DanhGiaKieuToc,
          as: "danh_gia_kieu_toc",
          attributes: ["id","muc_do_hai_long", "phan_hoi", "createdAt"],
          include: [
            {
              model: TaiKhoan,
              as: "TaiKhoanDanhGia",
              attributes : ["id","ho_ten", "anh_dai_dien"],
            },
          ],
        },
        {
          model: KieuTocPhuHop,
          as: "kieu_toc_phu_hop",
          attributes: ["id_kieu_khuon_mat"],
          include: [
            {
              model: KieuKhuonMat,
              as: "kieu_khuon_mat_phu_hop",
              attributes: ["kieu_khuon_mat", "hinh_anh"],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: hairStyle,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
}

//Lấy kiểu khuôn mặt
exports.getFaceShapes = async (req, res) => {
  try {
    const faceShapes = await KieuKhuonMat.findAll();
    res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: faceShapes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

//Lấy kiểu tóc theo khuôn mặt
exports.getHairStylesByFaceShape = async (req, res) => {
  try {
    const { kieu_khuon_mat } = req.params;
    const faceShape = await KieuKhuonMat.findOne({
      where: {
        kieu_khuon_mat: kieu_khuon_mat,
      },
    });
    // const hairStyles = await KieuTocPhuHop.findAll({
    //   where: {
    //     id_kieu_khuon_mat: faceShape.id,
    //   },
    //   include: [
    //     {
    //       model: KieuToc,
    //       as: "kieu_toc_phu_hop",
    //       include: [
    //         {
    //           model: HinhAnhKieuToc,
    //           as: "hinh_anh_kieu_toc",
    //         },
    //       ],
    //     },
    //   ],
    // });
    const hairStyles = await KieuToc.findAll({
      include: [
        {
          model: HinhAnhKieuToc,
          as: "hinh_anh_kieu_toc",
        },
        {
          model: KieuTocPhuHop,
          as: "kieu_toc_phu_hop",
          where: {
            id_kieu_khuon_mat: faceShape.id,
          },
          include: [
            {
              model: KieuKhuonMat,
              as: "kieu_khuon_mat_phu_hop",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: hairStyles,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// [
//     {
//         "id": 1,
//         "ten_kieu_toc": "Tóc ngắn",
//         "gioi_tinh": "Nam",
//         "mo_ta": "Kiểu tóc ngắn hiện đại",
//         "gia_tien": "150000",
//         "createdAt": null,
//         "updatedAt": null,
//         "hinh_anh_kieu_toc": [
//             {
//                 "id": 1,
//                 "id_kieu_toc": 1,
//                 "url_anh": "https://res.cloudinary.com/dli4qf7ox/image/upload/v1732188444/pd9mjwwtd0mn6tuz2r1u.jpg",
//                 "createdAt": null,
//                 "updatedAt": null
//             },
//             {
//                 "id": 2,
//                 "id_kieu_toc": 1,
//                 "url_anh": "https://res.cloudinary.com/dli4qf7ox/image/upload/v1732188444/pd9mjwwtd0mn6tuz2r1u.jpg",
//                 "createdAt": null,
//                 "updatedAt": null
//             }
//         ],
//         "kieu_toc_phu_hop": [
//             {
//                 "id": 1,
//                 "id_kieu_khuon_mat": 1,
//                 "id_kieu_toc": 1,
//                 "createdAt": null,
//                 "updatedAt": null,
//                 "kieu_khuon_mat_phu_hop": {
//                     "id": 1,
//                     "kieu_khuon_mat": "Mặt tròn",
//                     "hinh_anh": "mat_tron.jpg",
//                     "createdAt": null,
//                     "updatedAt": null
//                 }
//             },
//             {
//                 "id": 2,
//                 "id_kieu_khuon_mat": 2,
//                 "id_kieu_toc": 1,
//                 "createdAt": null,
//                 "updatedAt": null,
//                 "kieu_khuon_mat_phu_hop": {
//                     "id": 2,
//                     "kieu_khuon_mat": "Mặt vuông",
//                     "hinh_anh": "mat_vuong.jpg",
//                     "createdAt": null,
//                     "updatedAt": null
//                 }
//             }
//         ]
//     }]

//Thêm kiểu tóc
exports.addHairStyle = async (req, res) => {
  try {
    const {
      ten_kieu_toc,
      gioi_tinh,
      mo_ta,
      thoi_luong,
      gia_tien,
      kieu_toc_phu_hop,
    } = req.body;
    const hinh_anh_kieu_toc = req.files;

    const uploadedImageUrls = [];
    // Lặp qua từng file hình ảnh và tải lên lên Cloudinary
    for (const file of hinh_anh_kieu_toc) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        public_id: "HairSalon/" + file.filename,
      });

      uploadedImageUrls.push(uploadResult.url);
    }
    const newHairStyle = await KieuToc.create({
      ten_kieu_toc,
      gioi_tinh,
      mo_ta,
      thoi_luong,
      gia_tien,
    });

    //Thêm hình ảnh kiểu tóc
    if (uploadedImageUrls && uploadedImageUrls.length > 0) {
      uploadedImageUrls.forEach(async (item) => {
        await HinhAnhKieuToc.create({
          id_kieu_toc: newHairStyle.id,
          url_anh: item,
        });
      });
    }

    //Thêm kiểu tóc phù hợp
    if (kieu_toc_phu_hop && kieu_toc_phu_hop.length > 0) {
      //Nếu kieu_toc_phu_hop không phải mảng thì chuyển thành mảng
      if (!Array.isArray(kieu_toc_phu_hop)) {
        await KieuTocPhuHop.create({
          id_kieu_toc: newHairStyle.id,
          id_kieu_khuon_mat: kieu_toc_phu_hop,
        });
      } else {
        kieu_toc_phu_hop.forEach(async (item) => {
          await KieuTocPhuHop.create({
            id_kieu_toc: newHairStyle.id,
            id_kieu_khuon_mat: item,
          });
        });
      }
    }

    // // console.log("url ảnh đã upload:", uploadedImageUrls);
    return res.status(200).json({ message: "Thêm kiểu tóc thành công!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

//Cập nhật kiểu tóc
exports.updateHairStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      ten_kieu_toc,
      gioi_tinh,
      mo_ta,
      thoi_luong,
      gia_tien,
      kieu_toc_phu_hop,
      listImgUpdate,
      listNewImgUrl,
    } = req.body;

    const hairStyle = await KieuToc.findByPk(id);
    if (!hairStyle) {
      return res.status(404).json({ message: "Kiểu tóc không tồn tại" });
    }
    //Cập nhật thông tin kiểu tóc
    hairStyle.ten_kieu_toc = ten_kieu_toc;
    hairStyle.gioi_tinh = gioi_tinh;
    hairStyle.mo_ta = mo_ta;
    hairStyle.thoi_luong = thoi_luong;
    hairStyle.gia_tien = gia_tien;
    await hairStyle.save();

    //Cập nhật hình ảnh kiểu tóc phù hợp: kiểm tra listImgUpdate từ req.body và so sánh với hinh_anh_kieu_toc trong db
    //Nếu có hình ảnh nào trong listImgUpdate mà không có trong db thì thêm vào db
    //Nếu có hình ảnh nào trong db mà không có trong listImgUpdate thì xóa khỏi db
    //Nếu có hình ảnh nào trong cả listImgUpdate và db thì bỏ qua

    const hinhAnhKieuToc = await HinhAnhKieuToc.findAll({
      where: {
        id_kieu_toc: id,
      },
    });
    if (hinhAnhKieuToc && hinhAnhKieuToc.length > 0) {
      hinhAnhKieuToc.forEach(async (item) => {
        const existed = listImgUpdate.find((x) => x.id === item.id);
        if (!existed) {
          await item.destroy();
          console.log("Xóa hình ảnh:", item.id);
        }
      });
    }

    if (listNewImgUrl && listNewImgUrl.length > 0) {
      listNewImgUrl.forEach(async (item) => {
        await HinhAnhKieuToc.create({
          id_kieu_toc: id,
          url_anh: item,
        });
        console.log("Thêm hình ảnh:", item);
      });
    }

    //Cập nhật kiểu tóc phù hợp: kiểm tra kieu_toc_phu_hop từ req.body và so sánh với kieu_toc_phu_hop trong db
    //Nếu có kieu_toc_phu_hop nào trong req.body mà không có trong db thì thêm vào db
    //Nếu có kieu_toc_phu_hop nào trong db mà không có trong req.body thì xóa khỏi db
    //Nếu có kieu_toc_phu_hop nào trong cả req.body và db thì bỏ qua
    const kieuTocPhuHop = await KieuTocPhuHop.findAll({
      where: {
        id_kieu_toc: id,
      },
    });
    if (kieuTocPhuHop && kieuTocPhuHop.length > 0) {
      kieuTocPhuHop.forEach(async (item) => {
        const existed = kieu_toc_phu_hop.find(
          (x) => x.id_kieu_khuon_mat === item.id_kieu_khuon_mat
        );
        if (!existed) {
          await item.destroy();
          console.log("Xóa kieu_toc_phu_hop:", item.id_kieu_khuon_mat);
        }
      });
    }

    if (kieu_toc_phu_hop && kieu_toc_phu_hop.length > 0) {
      kieu_toc_phu_hop.forEach(async (item) => {
        const existed = kieuTocPhuHop.find(
          (x) => x.id_kieu_khuon_mat === item.id_kieu_khuon_mat
        );
        if (!existed) {
          await KieuTocPhuHop.create({
            id_kieu_toc: id,
            id_kieu_khuon_mat: item.id_kieu_khuon_mat,
          });
          console.log("Thêm kieu_toc_phu_hop:", item.id_kieu_khuon_mat);
        }
      });
    }

    // console.log("Dữ liệu nhận được:", listImgUpdate, listNewImgUrl);
    return res.status(200).json({ message: "Cập nhật kiểu tóc thành công!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa kiểu tóc
exports.deleteHairStyle = async (req, res) => {
  try {
    const { id } = req.params;

    const kieuTocPhuHop = await KieuTocPhuHop.findAll({
      where: {
        id_kieu_toc: id,
      },
    });
    if (kieuTocPhuHop && kieuTocPhuHop.length > 0) {
      kieuTocPhuHop.forEach(async (item) => {
        await item.destroy();
      });
    }

    const hinhAnhKieuToc = await HinhAnhKieuToc.findAll({
      where: {
        id_kieu_toc: id,
      },
    });

    if (hinhAnhKieuToc && hinhAnhKieuToc.length > 0) {
      hinhAnhKieuToc.forEach(async (item) => {
        await item.destroy();
      });
    }

    const kieuTocYeuThich = await KieuTocYeuThich.findAll({
      where: {
        id_kieu_toc: id,
      },
    });

    if (kieuTocYeuThich && kieuTocYeuThich.length > 0) {
      kieuTocYeuThich.forEach(async (item) => {
        await item.destroy();
      });
    }

    const hairStyle = await KieuToc.findByPk(id);
    if (!hairStyle) {
      return res.status(404).json({ message: "Kiểu tóc không tồn tại" });
    }
    await hairStyle.destroy();

    return res.status(200).json({ message: "Xóa kiểu tóc thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

//Xem danh sách kiểu tóc yêu thích của khách hàng
exports.getFavoriteHairStyles = async (req, res) => {
  try {
    const { id } = req.params;
    const favoriteHairStyles = await KieuTocYeuThich.findAll({
      where: {
        id_tai_khoan: id,
      },
      include: [
        {
          model: KieuToc,
          as: "kieu_toc",
          include: [
            {
              model: HinhAnhKieuToc,
              as: "hinh_anh_kieu_toc",
            },
            {
              model: DanhGiaKieuToc,
              as: "danh_gia_kieu_toc",
            },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: favoriteHairStyles,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

exports.addFavoriteHairStyle = async (req, res) => {
  try {
    const { id_tai_khoan, id_kieu_toc } = req.body;
    const existed = await KieuTocYeuThich.findOne({
      where: {
        id_tai_khoan,
        id_kieu_toc,
      },
    });

    if (existed) {
      return res.status(400).json({ message: "Kiểu tóc đã tồn tại" });
    }

    await KieuTocYeuThich.create({
      id_tai_khoan,
      id_kieu_toc,
    });

    return res.status(200).json({ message: "Thêm kiểu tóc vào yêu thích thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
}

exports.deleteFavoriteHairStyle = async (req, res) => {
  try {
    const { id_tai_khoan, id_kieu_toc } = req.body;
    const favoriteHairStyle = await KieuTocYeuThich.findOne({
      where: {
        id_tai_khoan,
        id_kieu_toc,
      },
    });

    if (!favoriteHairStyle) {
      return res.status(404).json({ message: "Kiểu tóc không tồn tại" });
    }

    await favoriteHairStyle.destroy();

    return res.status(200).json({ message: "Xóa kiểu tóc khỏi yêu thích thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
}

exports.checkFavoriteHairStyle = async (req, res) => {
  try {
    const { id_tai_khoan, id_kieu_toc } = req.query;
    const favoriteHairStyle = await KieuTocYeuThich.findOne({
      where: {
        id_tai_khoan,
        id_kieu_toc,
      },
    });
    let isExisted = false;
    if (favoriteHairStyle) {
      isExisted = true;
    }

    return res.status(200).json({ isExisted });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
}