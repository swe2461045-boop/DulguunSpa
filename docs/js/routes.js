import { renderOverviewPage } from "./pages/overviewPage.js";
import { renderSearchPage } from "./pages/searchPage.js";
import { renderCalculationPage } from "./pages/calculationPage.js";
import { renderBooksPage } from "./pages/booksPage.js";
import { renderContactPage } from "./pages/contactPage.js";
import { renderNotFoundPage } from "./pages/notFoundPage.js";

export const routes = {
  "#/overview": renderOverviewPage,
  "#/search": renderSearchPage,
  "#/calculation": renderCalculationPage,
  "#/books": renderBooksPage,
  "#/contact": renderContactPage,
  "#/404": renderNotFoundPage,
};
