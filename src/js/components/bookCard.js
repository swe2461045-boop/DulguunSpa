import { safeValue } from "../fn/format.js";
import { t, getLocalizedValue } from "../i18n/i18n.js";

export function renderBookCard(book) {
  return `
    <div class="card book-card">
    <figure class="image">
        <img src="${book.cover}" alt="${book.alt}" class="book-cover" />
    </figure>

    <div class="card-content book-description">
        <p class="content">
         ${getLocalizedValue(book.description)}
        </p>
    </div>

    <footer class="card-footer book-footer">
        <button
        class="button is-primary book-view-btn"
        data-pdf="${book.pdf}"
        >
         ${t("books.view")}
        </button>
    </footer>
    </div>
  `;
}
