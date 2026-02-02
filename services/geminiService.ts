import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a personalized prayer (Doa) based on the donor's name and intention.
 */
export const generatePrayer = async (name: string, intention: string): Promise<string> => {
  try {
    const prompt = `
      Buatkan sebuah doa singkat, tulus, dan menyejukkan hati (maksimal 50 kata) dalam Bahasa Indonesia.
      Doa ini ditujukan untuk donatur bernama "${name}" yang telah bersedekah untuk pembangunan Pesantren.
      Harapan/Niat donatur: "${intention || 'Semoga berkah dunia akhirat'}".
      Gunakan gaya bahasa yang santun, islami, namun tetap hangat dan modern.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview',
      contents: prompt,
    });

    return response.text || "Semoga Allah menerima amal ibadah Anda dan melipatgandakan rezeki Anda.";
  } catch (error) {
    console.error("Error generating prayer:", error);
    return "Jazakumullah Khairan Katsiran. Semoga Allah membalas kebaikan Anda dengan pahala yang berlipat ganda.";
  }
};