import express from "express";
import multer from "multer";
import { generateImage } from "../controllers/imageController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint: POST /api/images/generate
router.post("/generate", upload.single("photo"), generateImage);

export default router;
