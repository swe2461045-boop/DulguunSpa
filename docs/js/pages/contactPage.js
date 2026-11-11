import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderContactPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "contact",
    title: "Contact",
    content: `
      <p>Welcome to the Contact page.</p>
    `,
  });
}
