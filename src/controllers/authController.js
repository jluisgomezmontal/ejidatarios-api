import User from "../models/Usuarios.js";

// User login
export const loginUser = async (req, res) => {
    const { telefono, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ telefono });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the password (since it's not hashed, we can compare directly)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If login is successful, return user data
        res.status(200).json({
            _id: user._id,
            name: user.name,
            telefono: user.telefono,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
