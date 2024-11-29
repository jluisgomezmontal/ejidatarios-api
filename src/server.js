import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ejidatarioRoutes from "./routes/ejidatarios.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import authRoute from "./routes/authRoute.js";
import terrenos from "./routes/terrenos.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Reemplaza bodyParser.json()
app.use(
    cors({
      origin: "http://localhost:3000", // Cambia por tu dominio en producción
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Si estás manejando cookies o encabezados personalizados
    })
); // Habilitar CORS

// Conexión a la base de datos
mongoose
    .connect(
        "mongodb+srv://luis:220690@ejido.lpplq.mongodb.net/?retryWrites=true&w=majority&appName=ejido",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/ejidatarios", ejidatarioRoutes);
app.use("/api/terrenos", terrenos);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/auth", authRoute); // Rutas de autenticación

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
