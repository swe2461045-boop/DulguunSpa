let imageMap = {};

// ./data/images.json файлаас бүх зургын зам json-ыг авна.
export async function loadImages() {
  // Хэрэв аль хэдийн зурагны мэдээлэл ачаалагдсан бол дахин ачаалахгүй.
  if (Object.keys(imageMap).length > 0) return;

  const response = await fetch("./data/images.json");
  if (!response.ok) {
    throw new Error("Failed to load images.json");
  }

  imageMap = await response.json(); // Бүх images json { "01_0001": ["img/foods/01_0001_001.jpg", "img/foods/01_0001_001.jpg"], ... }
}

// "01_0001" --> ["img/foods/01_0001_001.jpg", "img/foods/01_0001_001.jpg"]
export function getImagesByFoodCode(foodCode) {
  return imageMap[foodCode] || [];
}
