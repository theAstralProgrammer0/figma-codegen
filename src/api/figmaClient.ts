//src/api/figmaClient.ts
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.figma.com/v1";

export async function getFile(fileKey: string): Promise<any> {
  const token = process.env.FIGMA_API_KEY;

  if (!token) {
    throw new Error("❌ Missing FIGMA_API_KEY in .env");
  }

  const response = await axios.get(`${BASE_URL}/files/${fileKey}`, {
    headers: { "X-Figma-Token": token }
  });

  return response.data;
}

