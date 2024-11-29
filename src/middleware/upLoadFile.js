import multer from "multer";

// Configuración para guardar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
