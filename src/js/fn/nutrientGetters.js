import { getLocalizedValue } from "../i18n/i18n.js";

export function getFoodCode(food) {
  return food.food_code;
}

export function getFoodName(food) {
  return getLocalizedValue(food.food_name);
}

export function getNutrient(food, group, key) {
  return Number(food?.[group]?.[key] ?? 0);
}

export function getEnergy(food) {
  return getNutrient(food, "proximates", "Energy (kcal)");
}

export function getProtein(food) {
  return getNutrient(food, "proximates", "Protein (g)");
}

export function getFat(food) {
  return getNutrient(food, "proximates", "Fat (g)");
}

export function getCarbohydrate(food) {
  return getNutrient(food, "proximates", "Carbohydrate (g)");
}

export function getCalcium(food) {
  return getNutrient(food, "minerals", "Calcium (mg)");
}

export function getIron(food) {
  return getNutrient(food, "minerals", "Iron (mg)");
}

export function getPhosphorus(food) {
  return getNutrient(food, "minerals", "Phosphorus (mg)");
}

export function getVitaminC(food) {
  return getNutrient(food, "vitamins", "Vitamin C (mg)");
}
