import Ejidatario from "../models/Ejidatario.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

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
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarios = async (req, res) => {
  try {
    const ejidatarios = await Ejidatario.find()
      .populate("creadoPor")
      .populate("actualizadoPor");
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
    const ejidatario = await Ejidatario.findOne({ _id: req.params.id })
      .populate("creadoPor")
      .populate("actualizadoPor");
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
    })
      .populate("creadoPor")
      .populate("actualizadoPor");
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarioByCurp = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({ curp: req.params.curp })
      .populate("creadoPor")
      .populate("actualizadoPor");
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEjidatario = async (req, res) => {
  try {
    if (req.file) {
      req.body.documentoPDF = req.file.filename;
    } else {
      req.body.documentoPDF = req.body.documentoPDF;
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
};

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

// Función que convierte un documento a Extended JSON v2 (Mongo Shell compatible)
function toExtendedJSON(doc) {
  const result = {};

  for (const key in doc) {
    const value = doc[key];

    if (value instanceof mongoose.Types.ObjectId) {
      result[key] = { $oid: value.toHexString() };
    } else if (value instanceof Date) {
      result[key] = { $date: value.toISOString() };
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = toExtendedJSON(value); // recursivo para objetos anidados
    } else {
      result[key] = value;
    }
  }

  return result;
}

export const getColeccion = async (req, res) => {
  const nombreColeccion = req.params.coleccion;

  try {
    const datos = await mongoose.connection.db
      .collection(nombreColeccion)
      .find({})
      .toArray();

    // Convertir cada documento a Extended JSON v2
    const extendedJSONDocs = datos.map((doc) => toExtendedJSON(doc));

    // Guardar como NDJSON (un documento JSON por línea)
    const contenido = extendedJSONDocs.map((d) => JSON.stringify(d)).join("\n");

    const nombreArchivo = path.join(process.cwd(), `${nombreColeccion}_compass.json`);
    fs.writeFileSync(nombreArchivo, contenido);

    res.download(nombreArchivo, (err) => {
      if (err) console.error(err);
      else fs.unlinkSync(nombreArchivo); // Borrar el archivo después de descargar
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al exportar la colección.");
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
