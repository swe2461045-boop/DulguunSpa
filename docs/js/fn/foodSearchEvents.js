import { renderNotification } from "../layouts/notificationLayout.js";
import { renderNutritionTables } from "../components/nutritionTables.js";
import { nutritionGroups } from "../components/searchSettingsSidebar.js";
import { getLocalizedValue, t } from "../i18n/i18n.js";

// food_group бүрээр бүлэглэсэн food_code, food_name авна. Жишээ нь: "Cereals and Cereal products" → [{ food_code: "01_0106", food_name: "Barley flour, whole grain" }, ...]
export function buildFoodGroups(data) {
  const grouped = new Map(); // Map бол (key → value) хэлбэрээр өгөгдөл хадгалах бүтэц юм. grouped объект үүсгэв.

  for (const item of data) {
    const groupKey = item.food_group?.en || "Other";

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, {
        groupName: item.food_group,
        items: new Map(),
      });
    }

    const groupData = grouped.get(groupKey);

    groupData.items.set(item.food_code, {
      food_code: item.food_code,
      food_name: item.food_name,
    });
  }

  return Array.from(grouped.values()).map((group) => ({
    groupName: group.groupName,

    items: Array.from(group.items.values()).sort((a, b) => getLocalizedValue(a.food_name).localeCompare(getLocalizedValue(b.food_name))),
  }));
}
/* Оролтын өгөгдөл:
  const data = [
    {
      food_group: "Cereals and Cereal products",
      food_code: "01_0106",
      food_name: "Barley flour, whole grain",
    },
    {
      food_group: "Cereals and Cereal products",
      food_code: "01_0101",
      food_name: "Rice",
    },
    {
      food_group: "Vegetables",
      food_code: "02_0001",
      food_name: "Carrot",
    },
    {
      food_group: "Vegetables",
      food_code: "02_0002",
      food_name: "Potato",
    },
  ];

Функц food_group-ээр бүлэглэнэ. Гаралтын өгөгдөл:
[
  {
    groupName: "Cereals and Cereal products",
    items: [
      {
        food_code: "01_0106",
        food_name: "Barley flour, whole grain",
      },
      {
        food_code: "01_0101",
        food_name: "Rice",
      },
    ],
  },
  {
    groupName: "Vegetables",
    items: [
      {
        food_code: "02_0001",
        food_name: "Carrot",
      },
      {
        food_code: "02_0002",
        food_name: "Potato",
      },
    ],
  },
];
*/

let nutritionData = [];

export function initNutritionData(data) {
  nutritionData = data;
}

// const DEFAULT_TYPES = ["proximates", "minerals", "vitamins"];
const DEFAULT_TYPES = nutritionGroups
  .flatMap((group) => group.items)
  .filter((item) => item.checked)
  .map((item) => item.value);

const DEFAULT_ITEM_COUNT = 3;

// UI дээрх бүх event (click, change, keydown)-уудыг холбож өгдөг функц
export function bindSearchEvents() {
  const searchRoot = document;
  const searchBtn = document.getElementById("searchBtn");
  const searchTxt = document.getElementById("searchTxt");

  if (!searchRoot) return;

  // button дээр товшиж food_name-ээр хайна.
  searchBtn?.addEventListener("click", handleTextSearch);

  // Текст бичээд Enter товч дарж food_name-ээр хайна.
  searchTxt?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTextSearch();
    }
  });

  // foodcode, nutrition checkbox-уудын event
  searchRoot.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('input[name="foodcode"]')) {
      handleFoodCodeSearch();
      return;
    }

    if (target.matches('input[name="nutrition"]')) {
      rerenderCurrentSelection();
    }
  });
}

// Текст бичиж food_name-ээр хайх функц
function handleTextSearch() {
  clearCheckedFoodCodes(); // Хүнсний жагсаалтаас сонгож хайх checkbox-уудыг бүгдийг нь uncheck болгов.

  const keyword = getSearchKeyword(); // input-ээс хайх текстийг авна.

  // Хайх үг хоосон бол анхааруулах мессеж харуулна.
  if (!keyword) {
    setResultHtml(renderNotification(t("notification.enterFoodName")));
    return;
  }
  renderCurrentResults();
}

// Хүнсний жагсаалтаас сонгож food_code-оор хайх функц
function handleFoodCodeSearch() {
  const searchTxt = document.getElementById("searchTxt");
  if (searchTxt) {
    searchTxt.value = "";
  }

  const selectedCodes = getSelectedFoodCodes();

  if (!selectedCodes.length) {
    setResultHtml(renderDefaultTables(nutritionData));
    return;
  }

  renderCurrentResults();
}

function rerenderCurrentSelection() {
  renderCurrentResults();
}

// Хүнсний жагсаалтаас сонгосон checkbox-уудын food_code болон input-ээс авсан keyword хоёроор nutritionData-ыг шүүж харуулна. Хэрэв хоёулаа хоосон бол эхний 4 элементийг харуулна.
function renderCurrentResults() {
  const matched = getMatchedItems();
  const selectedTypes = getSelectedNutritionTypes();
  setResultHtml(renderNutritionTables(matched, selectedTypes));
}

// Хүнсний жагсаалтаас сонгосон checkbox-уудын food_code болон input-ээс авсан keyword хоёроор nutritionData-ыг шүүж харуулна. Хэрэв хоёулаа хоосон бол эхний 4 элементийг харуулна.
function getMatchedItems() {
  const selectedCodes = getSelectedFoodCodes();
  const keyword = getSearchKeyword();

  if (selectedCodes.length) {
    return nutritionData.filter((item) => selectedCodes.includes(item.food_code));
  }

  if (keyword) {
    // 2-оос бага тэмдэгт бол хайхгүй
    if (keyword.length < 2) {
      return [];
    }

    return nutritionData.filter((item) => {
      const foodName = getLocalizedValue(item.food_name).toLowerCase();

      // Үгээр хайх
      const words = foodName.split(/\s+/);

      return words.some((word) => word.startsWith(keyword));
    });
  }

  return nutritionData.slice(0, DEFAULT_ITEM_COUNT);
}

// Хайх үгийг авна. Хэрэв хоосон бол "" гэж авна.
function getSearchKeyword() {
  return document.getElementById("searchTxt")?.value.trim().toLowerCase() || "";
}

// Хүнсний жагсаалтаас сонгосон checkbox-уудын food_code утгуудыг массив хэлбэрээр авна. Жишээ нь: ["01_0106", "01_0107", ...]
function getSelectedFoodCodes() {
  return Array.from(document.querySelectorAll('input[name="foodcode"]:checked')).map((checkbox) => checkbox.value);
}

// nutrition category-ээс сонгосон бүх checkbox-уудын утгыг авна. Жишээ нь: proximates, minerals, vitamins гэх мэт.
function getSelectedNutritionTypes() {
  return Array.from(document.querySelectorAll('input[name="nutrition"]:checked')).map((checkbox) => checkbox.value);
}

// Хүнсний жагсаалтаас сонгож хайх checkbox-уудыг бүгдийг нь uncheck болгох функц.
function clearCheckedFoodCodes() {
  document.querySelectorAll('input[name="foodcode"]:checked').forEach((checkbox) => {
    checkbox.checked = false;
  });
}

// // Үр дүн харуулах хэсэг рүү HTML-ийг гаргана.
function setResultHtml(html) {
  const resultTbl = document.getElementById("resultTbl");
  if (resultTbl) {
    resultTbl.innerHTML = html;
  }
}

// Эхний 4 элементийг харуулж байна. DEFAULT_ITEM_COUNT = 4. DEFAULT_TYPES = ["proximates", "minerals", "vitamins"] гэсэн nutrition category-үүдийг харуулж байна.
export function renderDefaultTables(data) {
  const defaultItems = data.slice(0, DEFAULT_ITEM_COUNT);
  return renderNutritionTables(defaultItems, DEFAULT_TYPES);
}

// Overview page-аас шилжихдээ хайх үгийг хадгалсан бол тэр үгээр хайх үйлдлийг автоматаар хийх функц
export function applyPendingSelectedFoodsFromOverview() {
  const raw = sessionStorage.getItem("pendingSelectedFoods");
  if (!raw) return;

  let selectedFoods = [];

  try {
    selectedFoods = JSON.parse(raw);
  } catch (error) {
    console.error("Invalid pendingSelectedFoods:", error);
    sessionStorage.removeItem("pendingSelectedFoods");
    return;
  }

  if (!Array.isArray(selectedFoods) || !selectedFoods.length) {
    sessionStorage.removeItem("pendingSelectedFoods");
    return;
  }

  const searchTxt = document.getElementById("searchTxt");
  const searchSection = document.getElementById("search");

  if (searchTxt) {
    searchTxt.value = "";
  }

  document.querySelectorAll('input[name="foodcode"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  selectedFoods.forEach((food) => {
    const checkbox = document.querySelector(`input[name="foodcode"][value="${food.food_code}"]`);

    if (checkbox) {
      checkbox.checked = true;
    }
  });

  handleFoodCodeSearch();

  if (searchSection) {
    searchSection.scrollIntoView({ behavior: "smooth" });
  }

  sessionStorage.removeItem("pendingSelectedFoods");
}
