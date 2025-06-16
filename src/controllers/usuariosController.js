import User from "../models/Usuarios.js";

// Create a new user (Register)
export const registerUser = async (req, res) => {
  const { name, telefono, password, isAdmin } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ telefono });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya esta registrado" });
    }

    // Create a new user instance
    const newUser = new User({ name, telefono, password, isAdmin });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "Inicio de sesion correcto",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado con exito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
