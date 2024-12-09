import multer from "multer";

// Configuración para guardar el archivo en memoria
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../../../var/data/uploads/ejidatarios');
        //cb(null, 'uploads/ejidatarios');
    },
    filename: (req, file, cb) => {
        const {nombre, apellidoPaterno, apellidoMaterno} = req.body;
        cb(null, `${apellidoPaterno}-${apellidoMaterno}-${nombre}-${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

export default upload;
