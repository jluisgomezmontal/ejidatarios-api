import User from "../models/Usuarios.js";

// Create a new user (Register)
export const registerUser = async (req, res) => {
    const { name, telefono, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ telefono });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user instance
        const newUser = new User({ name, telefono, password });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            telefono: savedUser.telefono,
            password: savedUser.password, // Returning plain password (not secure in real-world apps)
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
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
