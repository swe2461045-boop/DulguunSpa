const STORAGE_KEY = "theme";

export function getTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());
}
