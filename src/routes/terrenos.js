import express from "express";
import {
    createTerreno,
    getNumeroCertificado, getNumeroParcela,
    getTerrenos,
    getTerrenosBySujeto
} from "../controllers/terrenoController.js";
import upload from "../middleware/upLoadFile.js";

const router = express.Router();

// Crear un nuevo terreno
router.post("/",upload.single("documentoPDF") , createTerreno);
router.get("/", getTerrenos);
router.get("/sujeto/:idSujeto", getTerrenosBySujeto);
router.get("/certificado/:numeroCertificado", getNumeroCertificado);
router.get("/parcela/:numeroParcela", getNumeroParcela);
router.get("/files/:fileName", getFileTerreno);



export default router;
