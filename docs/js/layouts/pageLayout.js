// <section class="section">
//      <div class="container">
//          <h1> title </h1>
//          content
//      </div>
// </section>

export function renderPageLayout({
  id = "",
  title = "",
  content = "",
  sectionClass = "section",
  containerClass = "container",
  titleClass = "app-title",
}) {
  return `
    <section ${id ? `id="${id}"` : ""} class="${sectionClass}">
      <div class="${containerClass}">
        ${title ? `<h1 class="${titleClass}">${title}</h1> <div class="app-line"></div>` : ""}
        ${content}
      </div>
    </section>
  `;
}
