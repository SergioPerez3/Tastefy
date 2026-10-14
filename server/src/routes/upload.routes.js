import { Router } from "express";
import { isAuth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      const tooBig = error.code === "LIMIT_FILE_SIZE";
      return res.status(tooBig ? 413 : 400).json({
        message: tooBig ? "La imagen no puede pesar más de 5 MB" : error.message,
      });
    }
    next();
  });
};

router.post("/", isAuth, handleUpload, uploadImage);

export default router;