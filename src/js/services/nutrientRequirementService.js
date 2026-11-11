import { getLocalizedValue } from "../i18n/i18n.js";

let nutrientRequirementsCache = null;

export async function getNutrientRequirements() {
  if (nutrientRequirementsCache) return nutrientRequirementsCache;

  const response = await fetch("./data/nutrientRequirements.json");

  if (!response.ok) {
    throw new Error("Failed to load nutrient requirements data");
  }

  const data = await response.json();
  nutrientRequirementsCache = Array.isArray(data) ? data : [];

  return nutrientRequirementsCache;
}

export function getAgeValue(age) {
  if (age && typeof age === "object") {
    return age.en || "";
  }

  return age || "";
}

export function getAgeLabel(age) {
  return getLocalizedValue(age);
}

export async function getRequirementByAgeGender(age, gender) {
  const data = await getNutrientRequirements();

  return data.find((item) => getAgeValue(item.age) === age && item.gender === gender) || null;
}

export async function getRequirementAgeOptions() {
  const data = await getNutrientRequirements();
  const ageMap = new Map();

  data.forEach((item) => {
    const value = getAgeValue(item.age);

    if (!ageMap.has(value)) {
      ageMap.set(value, item.age);
    }
  });

  return [...ageMap.entries()].map(([value, label]) => ({
    value,
    label,
  }));
}

export async function getAgeObject(ageValue) {
  const data = await getNutrientRequirements();

  const item = data.find((row) => getAgeValue(row.age) === ageValue);

  return item?.age || ageValue;
}
