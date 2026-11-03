export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || "#/overview";
    const page = routes[hash];

    if (page) {
      page();
    } else {
      const notFound = routes["#/404"];
      if (notFound) {
        notFound();
      }
    }
  }

  // Хуудас анх ачаалагдахад renderRoute() ажиллана
  window.addEventListener("load", renderRoute);

  // URL-ийн # хэсэг өөрчлөгдөх бүрд renderRoute() дахин ажиллана
  window.addEventListener("hashchange", renderRoute);
}
