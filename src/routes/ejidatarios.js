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
  searchEjidatarios
} from "../controllers/ejidatariosController.js";
import upload from "../middleware/upLoadFile.js";

const router = express.Router();

// Crear un nuevo ejidatario
router.post("/", upload.single("documentoPDF"), createEjidatario);

// Obtener todos los ejidatarios
router.get("/", getEjidatarios);

// 🔍 Buscar ejidatarios por nombre o apellidos
router.get("/search", searchEjidatarios);

// Obtener un ejidatario por CURP
router.get("/curp/:curp", getEjidatarioByCurp);

// Obtener un ejidatario por número de celular
router.get("/telefono/:telefono", getEjidatarioByPhoneNumber);

// Obtener un ejidatario por ID de ejidatario
router.get("/id/:id", getEjidatarioByEjidatario);

// Descargar un archivo
router.get("/files/:fileName", getFile);

// Descargar coleccion
router.get("/export/:coleccion", getColeccion);

// 🆔 Obtener un ejidatario por Mongo _id (esta va al final para no interceptar rutas anteriores)
router.get("/:id", getEjidatarioById);

// Actualizar un ejidatario
router.put("/:id", upload.single("documentoPDF"), updateEjidatario);

// Eliminar un ejidatario
router.delete("/:id", deleteEjidatario);

export default router;
