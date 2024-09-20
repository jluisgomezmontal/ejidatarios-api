import mongoose from "mongoose";

const terrenoSchema = new mongoose.Schema({
  numeroCertificado: { type: String, required: true, unique: true },
  tipoCertificado: { type: String, required: true },
  numeroParcela: { type: String, required: true},
  actoJuridico: { type: String, required: true },
  idSujeto: { type: String, required: true },
});

const Terreno = mongoose.model("Terreno", terrenoSchema);

export default Terreno;
