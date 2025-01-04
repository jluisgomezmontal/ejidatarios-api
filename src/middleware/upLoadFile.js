import multer from "multer";

// Configuración para guardar el archivo en memoria
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.nombre) {
      cb(null, "../../../../var/data/uploads/ejidatarios");
      //cb(null, "uploads");
    } else {
      cb(null, "../../../../var/data/uploads/terrenos");
    }
  },
  filename: (req, file, cb) => {
    if (req.body.nombre) {
      const { nombre, apellidoPaterno, apellidoMaterno } = req.body;
      cb(
        null,
        `${apellidoPaterno}-${apellidoMaterno}-${nombre}-${Date.now()}-${
          file.originalname
        }`
      );
    } else {
      const { iD_Ejidatario, numeroParcela } = req.body;
      cb(
        null,
        `${numeroParcela}-${iD_Ejidatario}-${Date.now()}-${file.originalname}`
      );
    }
  },
});
const upload = multer({ storage: storage });

export default upload;
