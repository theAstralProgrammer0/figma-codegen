import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export async function fetchFigmaTree(key: string): Promise<any> {
  
  if (!key) throw new Error('Figma file key is required');

  const token = process.env.FIGMA_TOKEN;
  if (!token) throw new Error('FIGMA_TOKEN environment variable is missing');
  
  try {
    const response = await axios.get(`${process.env.FIGMA_API_URL}${key}`, {
      headers: { 'X-FIGMA-TOKEN': token }
    });
    if (!response.data.document) {
      throw new Error('No document found in Figma API response');
    }
    return response.data.document;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Figma API request failed: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error(`Failed to fetch Figma tree: ${(error as Error).message}`);
  }
}

export function parseFigmaUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/file\/([a-zA-Z0-9]+)\//);
  return match ? match[1] : null;
}
