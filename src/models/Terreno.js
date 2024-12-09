import mongoose from "mongoose";

const terrenoSchema = new mongoose.Schema({
  numeroCertificado: { type: String, unique: true },
  tipoCertificado: { type: String },
  numeroParcela: { type: String},
  actoJuridico: { type: String },
  iD_Ejidatario: { type: String },
  documentoPDF: { type: String }

});

const Terreno = mongoose.model("Terreno", terrenoSchema);

export default Terreno;
