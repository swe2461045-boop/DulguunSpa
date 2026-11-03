import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderBooksPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "books",
    title: "Books",
    content: `
      <p>Welcome to the Books page.</p>
    `,
  });
}
