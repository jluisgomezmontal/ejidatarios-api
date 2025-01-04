import Ejidatario from "../models/Ejidatario.js";
import multer from "multer";

const upload = multer();
export const createEjidatario = async (req, res) => {
  try {
    req.body.documentoPDF = req.file ? req.file.filename : "";
    const nuevoEjidatario = new Ejidatario(req.body);
    await nuevoEjidatario.save();
    res.status(201).json({
      msg: "Ejidatario creado con exito",
      nuevoEjidatario,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarios = async (req, res) => {
  try {
    const ejidatarios = await Ejidatario.find();
    res.status(200).json(ejidatarios);
  } catch (err) {
    res.status(400).json({
      error: err.message,
      msg: "No se encontraron ejidatarios",
    });
  }
};

export const getEjidatarioById = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({ _id: req.params.id });
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarioByEjidatario = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({
      iD_Ejidatario: req.params.id,
    });
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarioByCurp = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({ curp: req.params.curp });
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEjidatario = [
  upload.none(), // Middleware para procesar FormData sin archivos
  async (req, res) => {
    try {
      if (req.file) {
        req.body.documentoPDF = req.file.filename;
      }
      const ejidatario = await Ejidatario.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!ejidatario) {
        return res.status(404).json({ error: "Ejidatario no encontrado" });
      }
      res.json({ msg: "Ejidatario actualizado con éxito", ejidatario });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
];

export const getEjidatarioByPhoneNumber = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({
      telefono: req.params.telefono,
    });
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const filePath = `../../../../var/data/uploads/ejidatarios/${req.params.fileName}`;
    res.download(filePath);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEjidatario = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findByIdAndDelete(req.params.id);
    if (!ejidatario) {
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    } else {
      res.status(200).json({ message: "Ejidatario eliminado exitosamente" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
