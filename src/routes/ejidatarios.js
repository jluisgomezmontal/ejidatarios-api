import express from "express";
import {
  createEjidatario,
  getEjidatarios,
  getEjidatarioById,
  updateEjidatario,
  getEjidatarioByPhoneNumber,
  getEjidatarioByCurp,
  getFile,
  deleteEjidatario,
  getEjidatarioByEjidatario,
  getColeccion,
} from "../controllers/ejidatariosController.js";
import upload from "../middleware/upLoadFile.js";

const router = express.Router();

// Crear un nuevo ejidatario
router.post("/", upload.single("documentoPDF"), createEjidatario);

// Obtener todos los ejidatarios
router.get("/", getEjidatarios);

// Obtener un ejidatario por ID
router.get("/:id", getEjidatarioById);
router.get("/id/:id", getEjidatarioByEjidatario);

// Obtener un ejidatario por CURP
router.get("/curp/:curp", getEjidatarioByCurp);

// Obtener un ejidatario por número de celular
router.get("/telefono/:telefono", getEjidatarioByPhoneNumber);

// Descargar un archivo
router.get("/files/:fileName", getFile);
// Descargar coleccion
router.get("/export/:coleccion", getColeccion);

// Actualizar un ejidatario
router.put("/:id", upload.single("documentoPDF"), updateEjidatario);

// Eliminar un ejidatario
router.delete("/:id", deleteEjidatario);

export default router;
