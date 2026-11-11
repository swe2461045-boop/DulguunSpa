import { getNutritions } from "../services/nutritionService.js"; // Хоолны шим тэжээлийн өгөгдлийг авна.
import {
  buildFoodGroups,
  bindSearchEvents,
  renderDefaultTables,
  initNutritionData,
  applyPendingSelectedFoodsFromOverview,
} from "../fn/foodSearchEvents.js"; // food_group бүрээр багцалсан food_code, food_name-үүдийг авна. Жишээ нь: "Cereals and Cereal products" → [{ food_code: "01_0106", food_name: "Barley flour, whole grain" }, ...]

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js"; // Sidebar-тай хуудасны layout-г үүсгэх
import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";

import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

import { loadImages } from "../services/imageService.js";
import { renderImageModal, bindImageModalEvents } from "../components/imageModal.js";

import { t } from "../i18n/i18n.js";

let imageModalBound = false;

export async function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification(t("notification.loadingData")),
  });

  try {
    const nutritionData = await getNutritions(); // Хүнсний найрлагын JSON өгөгдүүдлийг авна.
    await loadImages(); // Зургийн JSON өгөгдлийг ачаална.
    initNutritionData(nutritionData);
    const groupedFoods = buildFoodGroups(nutritionData); // food_group бүрээр багцалсан food_code, food_name-үүдийг авна. Жишээ нь: "Cereals and Cereal products" → [{ food_code: "01_0106", food_name: "Barley flour, whole grain" }, ...]

    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `${renderSearchFoodName()} ${renderSearchSettings()} ${renderFoodGroupList(groupedFoods)}`,
        pageId: "search",
        pageTitle: t("searchPage.title"),
        mainContent: `
      <div id="resultTbl">
        ${renderDefaultTables(nutritionData)}
      </div>
    `,
      }) + renderImageModal();

    bindSidebar();
    bindMenuListToggle();
    bindSearchEvents();

    if (!imageModalBound) {
      bindImageModalEvents();
      imageModalBound = true;
    }

    applyPendingSelectedFoodsFromOverview(); // Overview page-аас шилжихдээ хайх үгийг хадгалсан бол тэр үгээр хайх үйлдлийг автоматаар хийх функц
  } catch (error) {
    app.innerHTML = renderPageLayout({
      content: renderNotification(t("notification.failedToLoadNutritionData"), "danger"),
    });
    console.error("Failed to load nutrition data:", error);
  }
}
