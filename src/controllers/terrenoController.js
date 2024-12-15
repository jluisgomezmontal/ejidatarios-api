import Ejidatario from "../models/Ejidatario.js";
import Terreno from "../models/Terreno.js"

export const createTerreno = async (req, res) => {
    req.body.documentoPDF = req.file ? req.file.filename : "";
    try {
        const terreno = new Terreno(req.body);
        await terreno.save();
        res.status(201).json({
            msg: "Terreno creado con exito",
            terreno
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getTerrenos = async (req, res) => {
    try {
        const terrenos = await Terreno.find().populate('propietario');
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getTerrenosById = async (req, res) => {
    try {
        const terrenos = await Terreno.find({_id : req.params.id}).populate('propietario');
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getTerrenosBySujeto = async (req, res) => {
    try {
        const terrenos = await Terreno.find({iD_Ejidatario : req.params.idSujeto}).populate('propietario');
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getNumeroCertificado = async (req, res) => {
    try {
        const terrenos = await Terreno.findOne({numeroCertificado : req.params.numeroCertificado}).populate('propietario');
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getNumeroParcela = async (req, res) => {
    try {
        const terrenos = await Terreno.findOne({numeroParcela : req.params.numeroParcela}).populate('propietario');
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getFileTerreno = async (req, res) => {
    try {
        const filePath = `../../../../var/data/uploads/terrenos/${req.params.fileName}`;
        res.download(filePath);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
