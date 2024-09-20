import express from "express";
import {
    createTerreno,
    getNumeroCertificado, getNumeroParcela,
    getTerrenos,
    getTerrenosBySujeto
} from "../controllers/terrenoController.js";


const router = express.Router();

// Crear un nuevo terreno
router.post("/", createTerreno);
router.get("/", getTerrenos);
router.get("/sujeto/:idSujeto", getTerrenosBySujeto);
router.get("/certificado/:numeroCertificado", getNumeroCertificado);
router.get("/parcela/:numeroParcela", getNumeroParcela);


export default router;
