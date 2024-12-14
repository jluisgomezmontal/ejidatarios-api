import mongoose from "mongoose";

const ejidatarioSchema = new mongoose.Schema({
    iD_Ejidatario: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    apellidoPaterno: { type: String, required: true, trim: true },
    calidadAgraria: { type: String, required: true, trim: true },
    apellidoMaterno: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    curp: { type: String, required: true, unique: true, trim: true },
    documentoPDF: { type: String },
    creado: { type: Date, default: Date.now },
});

const Ejidatario = mongoose.model("Ejidatario", ejidatarioSchema);

export default Ejidatario;
