import { GoogleGenAI } from "@google/genai";

// Inicializamos cliente de Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateImage = async (req, res) => {
  try {
    const { prompt, quality } = req.body;
    const photoBuffer = req.file.buffer;

    const base64Image = photoBuffer.toString("base64");

    // Seleccionamos el modelo según la calidad pedida
    let model;
    switch (quality) {
      case "standard":
        model = "imagen-4-standard";
        break;
      case "ultra":
        model = "imagen-4-ultra";
        break;
      default:
        model = "gemini-2.5-flash-image-preview"; // por defecto: flash
    }

    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ];

    // Llamada a Gemini API
    const response = await ai.models.generateContent({
      model,
      contents,
    });

    let generatedImage = null;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        generatedImage = part.inlineData.data; // imagen en base64
      }
    }

    if (!generatedImage) {
      return res.status(400).json({ error: "No se generó ninguna imagen" });
    }

    res.json({ image: generatedImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando la imagen" });
  }
};
export const generateImageTwoPhotos = async (req, res) => {
  try {
    const { prompt, quality } = req.body;

    // Obtenemos las dos fotos del request
    const photo1 = req.files["photo"]?.[0];
    const photo2 = req.files["photo2"]?.[0];

    if (!photo1 || !photo2) {
      return res.status(400).json({ error: "Se requieren dos imágenes" });
    }

    const base64Photo1 = photo1.buffer.toString("base64");
    const base64Photo2 = photo2.buffer.toString("base64");

    // Seleccionamos el modelo según la calidad pedida
    let model;
    switch (quality) {
      case "standard":
        model = "imagen-4-standard";
        break;
      case "ultra":
        model = "imagen-4-ultra";
        break;
      default:
        model = "gemini-2.5-flash-image-preview"; // por defecto: flash
    }

    // Creamos el array contents con prompt + dos imágenes
    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: photo1.mimetype,
          data: base64Photo1,
        },
      },
      {
        inlineData: {
          mimeType: photo2.mimetype,
          data: base64Photo2,
        },
      },
    ];

    // Llamada a Gemini API
    const response = await ai.models.generateContent({
      model,
      contents,
    });

    let generatedImage = null;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        generatedImage = part.inlineData.data; // imagen generada en base64
      }
    }

    if (!generatedImage) {
      return res.status(400).json({ error: "No se generó ninguna imagen" });
    }

    res.json({ image: generatedImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando la imagen" });
  }
};
