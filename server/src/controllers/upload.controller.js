import cloudinary from "../config/cloudinary.js";

const uploadFromBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "tastefy",
        resource_type: "image",
        transformation: [
          { width: 1200, height: 900, crop: "fill", gravity: "auto" },
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (error, result) => (error ? reject(error) : resolve(result)),
    );

    stream.end(buffer);
  });

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha enviado ninguna imagen" });
    }

    const result = await uploadFromBuffer(req.file.buffer);

    res.status(201).json({ message: "Imagen subida", url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen" });
  }
};
