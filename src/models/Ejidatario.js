import mongoose from "mongoose";

const ejidatarioSchema = new mongoose.Schema({
    iD_Ejidatario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    calidadAgraria: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    telefono: { type: String, required: true },
    curp: { type: String, required: true, unique: true },
    documentoPDF: { type: String }
});

const Ejidatario = mongoose.model("Ejidatario", ejidatarioSchema);

export default Ejidatario;
