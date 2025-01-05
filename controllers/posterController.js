const { BaiDang } = require('../models');

// Lấy tất cả bài đăng
exports.getAllPosters = async (req, res) => {
  try {
    const posters = await BaiDang.findAll();
    
    const plainPosters = posters.map((p) => p.get({ plain: true }));

    plainPosters.forEach((poster) => {
      const date = new Date(poster.ngay_dang);
      const localDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
      poster.ngay_dang = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(localDate);
    }
    );
    
    res.status(200).json(plainPosters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm bài đăng
exports.addPoster = async (req, res) => {
  try {
    const { tieu_de, noi_dung, hinh_anh, id_nhan_vien } = req.body;
    const newPoster = await BaiDang.create({
      tieu_de,
      noi_dung,
      hinh_anh,
      ngay_dang: new Date(),
      hien_thi: true,
      id_tai_khoan: id_nhan_vien,
    });
    res.status(201).json(newPoster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa bài đăng
exports.deletePoster = async (req, res) => {
  try {
    const { id } = req.params;
    const poster = await BaiDang.findByPk(id);
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }
    await poster.destroy();
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật bài đăng
exports.updatePoster = async (req, res) => {
  try {
    const { id } = req.params;
    const { tieu_de, noi_dung, hinh_anh } = req.body;
    const poster = await BaiDang.findByPk(id);
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }
    await poster.update({
      tieu_de,
      noi_dung,
      hinh_anh,
    });
    res.status(200).json(poster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};