import multer from "multer";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato no válido. Usa JPG, PNG o WEBP"));
    }
  },
});