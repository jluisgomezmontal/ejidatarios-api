import express from "express";
import {
  createTerreno,
  deleteTerreno,
  getFileTerreno,
  getNumeroCertificado,
  getNumeroParcela,
  getPosesionario,
  getTerrenos,
  getTerrenosById,
  getTerrenosBySujeto,
  updateTerreno,
} from "../controllers/terrenoController.js";
import upload from "../middleware/upLoadFile.js";

const router = express.Router();

// Crear un nuevo terreno
router.post("/", upload.single("documentoPDF"), createTerreno);
router.put("/:id", upload.single("documentoPDF"), updateTerreno);
router.get("/", getTerrenos);
router.get("/:id", getTerrenosById);
router.get("/sujeto/:idSujeto", getTerrenosBySujeto);
router.get("/certificado/:numeroCertificado", getNumeroCertificado);
router.get("/parcela/:numeroParcela", getNumeroParcela);
router.get("/origen/:numeroParcela", getPosesionario);
router.get("/files/:fileName", getFileTerreno);
router.delete("/:id", deleteTerreno);
export default router;
