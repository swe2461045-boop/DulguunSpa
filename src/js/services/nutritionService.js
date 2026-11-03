import { DATA_MODE, LOCAL_NUTRITIONS_URL, API_NUTRITIONS_URL } from "../config.js";

let nutritionCache = null;

export async function getNutritions() {
  if (nutritionCache) {
    return nutritionCache;
  }

  const url = DATA_MODE === "api" ? API_NUTRITIONS_URL : LOCAL_NUTRITIONS_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load nutritions data");
  }

  const data = await response.json();
  nutritionCache = data;
  return data;
}
