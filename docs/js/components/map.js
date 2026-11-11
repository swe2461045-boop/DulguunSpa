import { loadMapSvg, getFoodsByProvince, loadProvinceInfo } from "../services/mapService.js";
import { openModal, renderModalFoodList, renderProvinceInfo } from "./infoModal.js";
import { t } from "../i18n/i18n.js";

// Газрын зургийн HTML хэсгийг дүрслэх
export function renderMap() {
  return `
    <div class="map-wrap">
      <div id="svg-container"></div>
    </div>
  `;
}

// Газрын зургийг ачаалж, аймаг дээр click event холбоно.
export async function bindMapEvents(nutritionData, lang = "en") {
  const svgContainer = document.getElementById("svg-container");
  if (!svgContainer) return;

  const provinceInfo = await loadProvinceInfo();
  const svgData = await loadMapSvg();
  svgContainer.innerHTML = svgData;

  updateMapLabels(svgContainer, lang);

  const provincePaths = svgContainer.querySelectorAll("svg path[name]");

  provincePaths.forEach((path) => {
    path.addEventListener("click", () => {
      const provinceNameEn = path.getAttribute("name")?.trim();
      if (!provinceNameEn) return;

      const provinceDisplayName =
        provinceTitleMap[provinceNameEn]?.[lang] || `${provinceNameMap[provinceNameEn]?.[lang]} ${t("modal.province")}`;

      const matchedFoods = getFoodsByProvince(nutritionData, provinceNameEn);

      const infoHtml = renderProvinceInfo(provinceInfo[provinceNameEn]);

      let foodsHtml;
      if (matchedFoods.length > 0) {
        const foods = matchedFoods.map((item) => ({
          food_code: item.food_code,
          food_name: typeof item.food_name === "object" ? item.food_name?.[lang] || item.food_name?.en : item.food_name,
        }));

        foodsHtml = `<p class="province-subtitle">${t("modal.analyzedFoods")}</p>` + renderModalFoodList(foods);
      } else {
        foodsHtml = `<p class="has-text-grey">${t("notification.noFoodData")}</p>`;
      }

      openModal({
        title: provinceDisplayName,
        content: infoHtml + foodsHtml,
      });
    });
  });
}

const provinceNameMap = {
  Uvs: { en: "Uvs", mn: "Увс" },
  Orkhon: { en: "Orkhon", mn: "Орхон" },
  "Govi-Sumber": { en: "Govi-Sumber", mn: "Говьсүмбэр" },
  Khovd: { en: "Khovd", mn: "Ховд" },
  Dornod: { en: "Dornod", mn: "Дорнод" },
  Dornogovi: { en: "Dornogovi", mn: "Дорноговь" },
  Umnugovi: { en: "Umnugovi", mn: "Өмнөговь" },
  Khuvsgul: { en: "Khuvsgul", mn: "Хөвсгөл" },
  Bulgan: { en: "Bulgan", mn: "Булган" },
  Uvs: { en: "Uvs", mn: "Увс" },
  Selenge: { en: "Selenge", mn: "Сэлэнгэ" },
  "Darkhan-Uul": { en: "Darkhan-Uul", mn: "Дархан-Уул" },
  Khentii: { en: "Khentii", mn: "Хэнтий" },
  Tuv: { en: "Tuv", mn: "Төв" },
  Ulaanbaatar: { en: "Ulaanbaatar", mn: "Улаанбаатар" },
  Arkhangai: { en: "Arkhangai", mn: "Архангай" },
  Dundgovi: { en: "Dundgovi", mn: "Дундговь" },
  Uvurkhangai: { en: "Uvurkhangai", mn: "Өвөрхангай" },
  Zavkhan: { en: "Zavkhan", mn: "Завхан" },
  "Govi-Altai": { en: "Govi-Altai", mn: "Говь-Алтай" },
  Sukhbaatar: { en: "Sukhbaatar", mn: "Сүхбаатар" },
  Bayankhongor: { en: "Bayankhongor", mn: "Баянхонгор" },
  "Bayan-Ulgii": { en: "Bayan-Ulgii", mn: "Баян-Өлгий" },
};

const provinceTitleMap = {
  Ulaanbaatar: {
    en: "Ulaanbaatar city",
    mn: "Улаанбаатар хот",
  },
};

const updateMapLabels = function updateMapLabels(svgContainer, lang = "en") {
  svgContainer.querySelectorAll("svg text").forEach((text) => {
    const enName = text.textContent.trim();
    const names = provinceNameMap[enName];

    if (names) {
      text.textContent = names[lang] || names.en;
    }
  });
};
