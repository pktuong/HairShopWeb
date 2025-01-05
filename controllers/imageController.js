const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs");

exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const uploadedImageUrls = [];

    for (const file of req.files) {
      const filePath = file.path.replace(/\\/g, "/"); // Chuẩn hóa đường dẫn

      // Kiểm tra file tồn tại
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at path: ${filePath}`);
      }

      // Upload lên Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: `HairSalon/${file.filename}`,
      });

      uploadedImageUrls.push(uploadResult.secure_url);

      // Xóa file tạm sau khi upload
      fs.unlinkSync(filePath);
    }

    res.json({
      message: "Images uploaded successfully",
      imageUrls: uploadedImageUrls,
    });
  } catch (error) {
    console.error("Error uploading product images:", error);
    res.status(500).json({ error: "Failed to upload product images" });
  }
};



