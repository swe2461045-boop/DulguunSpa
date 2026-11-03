import { renderPageLayout } from "./pageLayout.js";

export function renderSidebarPageLayout({
  sidebarContent = "",
  mainContent = "",
  pageId = "",
  pageTitle = "",
  sidebarId = "docsSidebar",
  overlayId = "sidebarOverlay",
  openButtonId = "openSidebar",
  closeButtonId = "closeSidebar",
}) {
  const renderedMainContent = renderPageLayout({
    id: pageId,
    title: pageTitle,
    content: mainContent,
  });

  return `
    <div class="app-mobile-sidebar"> 
      <button id="${openButtonId}" class="app-sidebar-icon-btn" aria-label="Open sidebar" type="button">
        ↪
      </button>
    </div>

    <div id="${overlayId}" class="app-sidebar-overlay"></div>

    <div class="app-shell">
      <aside id="${sidebarId}" class="app-sidebar">
        <div class="app-sidebar-mobile-head">
          <button id="${closeButtonId}" class="button is-light is-small" aria-label="Close sidebar" type="button">
            ✕
          </button>
        </div>

        <nav class="menu">
          ${sidebarContent}
        </nav>
      </aside>

      <main class="app-main-content">
        ${renderedMainContent}
      </main>
    </div>
  `;
}
