import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderCalculationPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "calculation",
    title: "Calculation",
    content: `
      <p>Welcome to the Calculation page.</p>
    `,
  });
}
