import Terreno from "../models/Terreno.js"

export const createTerreno = async (req, res) => {
    try {
        const terreno = new Terreno(req.body);
        await terreno.save();
        res.status(201).json(terreno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getTerrenos = async (req, res) => {
    try {
        const terrenos = await Terreno.find();
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getTerrenosBySujeto = async (req, res) => {
    try {
        const terrenos = await Terreno.find({idSujeto : req.params.idSujeto});
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getNumeroCertificado = async (req, res) => {
    try {
        const terrenos = await Terreno.findOne({numeroCertificado : req.params.numeroCertificado});
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getNumeroParcela = async (req, res) => {
    try {
        const terrenos = await Terreno.findOne({numeroParcela : req.params.numeroParcela});
        res.status(200).json(terrenos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};