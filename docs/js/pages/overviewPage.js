import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderOverviewPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "overview",
    title: t("overview.title"),
    content: `
      <p>${t("overview.welcome")}</p>
    `,
  });
}
