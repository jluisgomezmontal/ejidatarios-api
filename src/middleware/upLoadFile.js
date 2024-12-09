import multer from "multer";

// Configuración para guardar el archivo en memoria
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../../../var/data/uploads/ejidatarios');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now());
    }
});
const upload = multer({ storage: storage });

export default upload;
