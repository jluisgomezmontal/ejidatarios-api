import express from "express";
import {
  createEjidatario,
  getEjidatarios,
  getEjidatarioById,
  updateEjidatario,
  deleteEjidatario,
  getEjidatarioByPhoneNumber,
  getEjidatarioByCurp, getFile,
} from "../controllers/ejidatariosController.js";
import upload from "../middleware/upLoadFile.js";

const router = express.Router();

// Crear un nuevo ejidatario
router.post("/", upload.single("documentoPDF"),createEjidatario);

// Obtener todos los ejidatarios
router.get("/", getEjidatarios);

// Obtener un ejidatario por ID
router.get("/id/:id", getEjidatarioById);

router.get("/curp/:curp", getEjidatarioByCurp);

// Obtener un ejidatario por número de celular
router.get("/phone/:telefono", getEjidatarioByPhoneNumber);
router.get("/files/:fileName", getFile);

// Actualizar un ejidatario
router.put("/:id", updateEjidatario);

// Eliminar un ejidatario
router.delete("/:id", deleteEjidatario);

export default router;
