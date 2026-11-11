import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const imageDir = path.join(projectRoot, "src", "img", "foods");
const outputDir = path.join(projectRoot, "src", "data");
const outputFile = path.join(outputDir, "images.json");

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function isImageFile(fileName) {
  return /\.(jpg|jpeg|png|webp)$/i.test(fileName);
}

function extractFoodCode(fileName) {
  // 01_0106_001.jpg -> 01_0106
  const match = fileName.match(/^(\d{2}_\d{4})_\d{3}\.(jpg|jpeg|png|webp)$/i);
  return match ? match[1] : null;
}

function buildImageMap(files) {
  const imageMap = {};

  for (const file of files) {
    const foodCode = extractFoodCode(file);
    if (!foodCode) continue;

    if (!imageMap[foodCode]) {
      imageMap[foodCode] = [];
    }

    imageMap[foodCode].push(`img/foods/${file}`);
  }

  for (const foodCode of Object.keys(imageMap)) {
    imageMap[foodCode].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }

  return imageMap;
}

function main() {
  if (!fs.existsSync(imageDir)) {
    console.error(`Image directory not found: ${imageDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imageDir).filter(isImageFile);
  const imageMap = buildImageMap(files);

  ensureDirectoryExists(outputDir);
  fs.writeFileSync(outputFile, JSON.stringify(imageMap, null, 2), "utf-8");

  console.log(`Generated: ${outputFile}`);
  console.log(`Food codes with images: ${Object.keys(imageMap).length}`);
  console.log(`Total image files: ${files.length}`);
}
main();
