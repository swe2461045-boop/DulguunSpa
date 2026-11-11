// SVG газрын зургийг ачаалах
export async function loadMapSvg() {
  const response = await fetch("./img/map.svg");

  if (!response.ok) {
    throw new Error("Failed to load map.svg");
  }

  return await response.text();
}

// Аймаг бүрийн онцлог хүнсний мэдээлэл (data/provinces.json)
let provinceInfoCache = null;
export async function loadProvinceInfo() {
  if (provinceInfoCache) return provinceInfoCache;
  try {
    const response = await fetch("./data/provinces.json");
    provinceInfoCache = response.ok ? await response.json() : {};
  } catch (error) {
    console.error("Failed to load provinces.json:", error);
    provinceInfoCache = {};
  }
  return provinceInfoCache;
}

// Аймгийн нэрээр food data шүүх
export function getFoodsByProvince(nutritionData, provinceNameEn) {
  if (!Array.isArray(nutritionData)) return [];

  return nutritionData.filter((item) => {
    const province = typeof item.province === "object" ? item.province?.en : item.province;

    return province === provinceNameEn;
  });
}
