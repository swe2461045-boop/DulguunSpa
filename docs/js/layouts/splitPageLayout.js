import { renderPageLayout } from "./pageLayout.js";

export function renderSplitPageLayout({
  leftContent = "",
  rightContent = "",

  pageId = "",
  pageTitle = "",

  leftClass = "column is-12-mobile is-7-tablet is-8-desktop",
  rightClass = "column is-12-mobile is-5-tablet is-4-desktop content",

  columnsClass = "columns is-variable is-2",
}) {
  const splitContent = `
    <div class="${columnsClass}">
      <div class="${leftClass}">
        ${leftContent}
      </div>

      <div class="${rightClass}">
        ${rightContent}
      </div>
    </div>
  `;

  return renderPageLayout({
    id: pageId,
    title: pageTitle,
    content: splitContent,
  });
}
