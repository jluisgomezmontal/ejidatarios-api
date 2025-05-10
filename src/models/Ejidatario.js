import mongoose from "mongoose";

const ejidatarioSchema = new mongoose.Schema(
  {
    iD_Ejidatario: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    apellidoPaterno: { type: String, required: true, trim: true },
    calidadAgraria: { type: String, required: true, trim: true },
    apellidoMaterno: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    curp: { type: String, required: true, unique: true, trim: true },
    documentoPDF: { type: String },
    creado: { type: Date, default: Date.now },
    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    actualizadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Ejidatario = mongoose.model("Ejidatario", ejidatarioSchema);

export default Ejidatario;
