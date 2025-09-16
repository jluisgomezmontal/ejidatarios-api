import express from "express";
import multer from "multer";
import { generateImage, generateImageTwoPhotos } from "../controllers/imageController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint: POST /api/images/generate
router.post("/generate", upload.single("photo"), generateImage);
router.post(
  "/actor",
  upload.fields([
    { name: "photo1", maxCount: 1 },
    { name: "photo2", maxCount: 1 },
  ]),
  generateImageTwoPhotos
);

export default router;
