import mongoose from "mongoose";

const terrenoSchema = new mongoose.Schema({
  numeroParcela: { type: String, trim: true },
  tipoCertificado: { type: String, trim: true, required: true },
  actoJuridico: { type: String, trim: true, required: true },
  numeroCertificado: { type: String, trim: true, required: true },
  parcelaOrigen: { type: String, trim: true },
  documentoPDF: { type: String, trim: true },
  iD_Ejidatario: { type: String, trim: true, required: true },
  porcentaje: { type: String, trim: true },
  creado: { type: Date, default: Date.now },
  propietario: {
    type: mongoose.Schema.ObjectId, // Cambiado para usar ObjectId
    ref: "Ejidatario", // Referencia al modelo Ejidatario
  },
  propietarioOrigen: {
    type: mongoose.Schema.ObjectId, // Cambiado para usar ObjectId
    ref: "Ejidatario", // Referencia al modelo Ejidatario
  },
  poseciones: {
    type: mongoose.Schema.ObjectId, // Cambiado para usar ObjectId
    ref: "Terreno", // Referencia al modelo Ejidatario
  },
});

const Terreno = mongoose.model("Terreno", terrenoSchema);

export default Terreno;
