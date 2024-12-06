import Ejidatario from "../models/Ejidatario.js";

export const createEjidatario = async (req, res) => {
  try {
    const {
      iD_Ejidatario,
      calidadAgraria,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      domicilio,
      telefono,
      curp,
    } = req.body;

    // Crear un nuevo objeto Ejidatario
    const nuevoEjidatario = new Ejidatario({
      iD_Ejidatario,
      calidadAgraria,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      domicilio,
      telefono,
      curp,
      documentoPDF: req.file.filename, // Guardar el archivo si existe
    });
    // Guardar en la base de datos
    await nuevoEjidatario.save();

    res.status(201).json(nuevoEjidatario);
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
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarioById = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({iD_Ejidatario : req.params.id});
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEjidatarioByCurp = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findOne({curp : req.params.curp});
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEjidatario = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json(ejidatario);
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

export const deleteEjidatario = async (req, res) => {
  try {
    const ejidatario = await Ejidatario.findByIdAndDelete(req.params.id);
    if (!ejidatario)
      return res.status(404).json({ error: "Ejidatario no encontrado" });
    res.status(200).json({ message: "Ejidatario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const filePath = `../../../../var/data/uploads/${req.params.fileName}`;
    res.download(filePath);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
