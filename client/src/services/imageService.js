const API_URL = `${import.meta.env.VITE_API_URL}/upload`;

export const uploadImage = async (file) => {
  const body = new FormData();
  body.append("image", file); // "image" es el nombre que espera multer

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al subir la imagen");
  }

  return data.url;
};