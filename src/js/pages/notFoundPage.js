import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderNotFoundPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "notFound",
    title: "Not Found",
    content: `
      <p>Welcome to the Not Found page.</p>
    `,
  });
}
