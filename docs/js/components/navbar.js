import { t, toggleLanguage } from "../i18n/i18n.js";

export function renderNavbar() {
  return `
    <header class="app-sticky app-shadow">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item has-text-weight-bold is-uppercase app-logo" href="#/overview">
              <figure class="image"><img src="./img/icon/icon.png" alt="logo" /></figure>
              <p><span class="is-hidden-mobile">${t("nav.brandSpan")}</span> ${t("nav.brand")}</p>
            </a>
            <a class="navbar-burger" role="button" aria-expanded="false" data-target="topNavbar">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div class="navbar-menu has-text-weight-semibold has-text-centered" id="topNavbar">
            <div class="navbar-start app-top-navbar-right">
              <a class="navbar-item" href="#/overview">
                <span class="icon has-text-warning">
                  <i class="fas fa-circle-question"></i>
                </span>
                <span>${t("nav.overview")}</span>
              </a>
              <a class="navbar-item" href="#/search">
                <span class="icon has-text-primary">
                  <i class="fas fa-search"></i>
                </span>
                <span>${t("nav.search")}</span>
              </a>
              <a class="navbar-item" href="#/calculation">
                <span class="icon has-text-link">
                  <i class="fas fa-calculator"></i>
                </span>
                <span>${t("nav.calculation")}</span>
              </a>
              <a class="navbar-item" href="#/books">
                <span class="icon has-text-info">
                  <i class="fas fa-book"></i>
                </span>
                <span>${t("nav.books")}</span>
              </a>

              <a class="navbar-item" href="#/contact">
                <span class="icon has-text-danger">
                  <i class="fas fa-address-card"></i>
                </span>
                <span>${t("nav.contact")}</span>
              </a>
            </div>

            <div class="navbar-end">
              <a class="navbar-item" href="#" id="langToggle">${t("nav.language")}</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
}

export function initNavbar() {
  const burger = document.querySelector(".navbar-burger");
  const languageToggle = document.getElementById("langToggle");

  if (!burger) return;

  const targetId = burger.dataset.target;
  const menu = document.getElementById(targetId);
  const navLinks = menu?.querySelectorAll(".navbar-item[href^='#/']");

  function openMenu() {
    burger.classList.add("is-active");
    menu?.classList.add("is-active");
    burger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    burger.classList.remove("is-active");
    menu?.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = burger.classList.contains("is-active");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burger.addEventListener("click", toggleMenu);

  navLinks?.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1023) {
        closeMenu();
      }
    });
  });

  if (languageToggle) {
    languageToggle.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      toggleLanguage();
      window.location.reload();
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) {
      closeMenu();
    }
  });
}

export function mountNavbar(root) {
  if (!root) return;
  root.innerHTML = renderNavbar();
  initNavbar();
}
