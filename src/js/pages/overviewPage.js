import { renderSplitPageLayout } from "../layouts/splitPageLayout.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderMap, bindMapEvents } from "../components/map.js";
import { renderOverviewText } from "../components/overviewText.js";
import { renderInfoModal, bindModalEvents } from "../components/infoModal.js";

import { getNutritions } from "../services/nutritionService.js";
import { loadTxt } from "../services/txtService.js";
import { getCurrentLanguage, t } from "../i18n/i18n.js";

export async function renderOverviewPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification("Loading data..."),
  });

  try {
    const nutritionData = await getNutritions();
    await loadTxt();

    const lang = getCurrentLanguage() || "en";

    app.innerHTML =
      renderSplitPageLayout({
        pageId: "overview",
        pageTitle: t("overview.title"),
        leftContent: renderMap(),
        rightContent: renderOverviewText(lang),
      }) + renderInfoModal();

    // Modal-ийн event-үүдийг холбоно.
    bindModalEvents();

    await bindMapEvents(nutritionData, lang);
  } catch (error) {
    app.innerHTML = renderPageLayout({
      content: renderNotification("Failed to load overview page.", "danger"),
    });

    console.error("Failed to render overview page:", error);
  }
}
