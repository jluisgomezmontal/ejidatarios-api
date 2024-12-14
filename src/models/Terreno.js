import mongoose from "mongoose";

const terrenoSchema = new mongoose.Schema({
  numeroParcela: { type: String},
  tipoCertificado: { type: String },
  actoJuridico: { type: String },
  numeroCertificado: { type: String, },
  parcelaOrigen: { type: String, },
  documentoPDF: { type: String },
  iD_Ejidatario: { type: String },
});

const Terreno = mongoose.model("Terreno", terrenoSchema);

export default Terreno;
