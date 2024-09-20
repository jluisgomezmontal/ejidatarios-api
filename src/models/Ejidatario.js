import mongoose from "mongoose";

const ejidatarioSchema = new mongoose.Schema({
    iD_Ejidatario: { type: String, required: true, unique: true },
    calidadAgraria: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    domicilio: { type: String, required: true },
    telefono: { type: String, required: true },
    curp: { type: String, required: true, unique: true },
});

const Ejidatario = mongoose.model("Ejidatario", ejidatarioSchema);

export default Ejidatario;
