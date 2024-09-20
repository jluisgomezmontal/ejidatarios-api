import express from "express";
import {registerUser, getUsers, deleteUser} from "../controllers/usuariosController.js";

const router = express.Router();

// Register new user
router.post("/", registerUser);

// Get all users
router.get("/", getUsers);

// Delete a user
router.delete("/:id", deleteUser);

export default router;