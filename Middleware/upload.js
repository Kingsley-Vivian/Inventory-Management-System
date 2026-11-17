const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary-v2");
const cloudinary = require("../Config/Cloudinary");

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
    folder: "bokusupermarket/products",
    allowed_formats: [ "jpg", "jpeg", "png" ],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
   }
});

const upload = multer({
    storage: storage
});

module.exports = upload;