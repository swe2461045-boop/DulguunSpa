import { mountNavbar } from "./components/navbar.js";
import { initRouter } from "./router.js";
import { routes } from "./routes.js";

const navbarRoot = document.getElementById("navbar");
mountNavbar(navbarRoot);

initRouter(routes);
