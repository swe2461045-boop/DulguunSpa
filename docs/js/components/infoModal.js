import { escapeHtml } from "../fn/format.js";
import { getLocalizedValue, t } from "../i18n/i18n.js";

// Аймгийн мэдээлэл болон food list харуулах modal
export function renderInfoModal() {
  return `
    <div class="modal" id="infoModal">
      <div class="modal-background"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title" id="modalTitle">
            ${t("modal.province")}
          </p>

          <button class="delete" aria-label="close"></button>
        </header>

        <section class="modal-card-body">
          <div id="modalContent">
            ${t("modal.informationWillAppear")}
          </div>
        </section>

        <footer class="modal-card-foot is-flex is-justify-content-space-between">
          <div>
            <span
              id="selectedCount"
              class="tag is-warning is-light is-medium">
              0 ${t("modal.selected")}
            </span>
          </div>

          <div class="buttons">
            <button
              class="button is-link is-small"
              id="clearFoodsBtn"
              type="button">
              ${t("modal.clear")}
            </button>

            <button
              class="button is-link is-small"
              id="selectAllFoodsBtn"
              type="button">
              ${t("modal.selectAll")}
            </button>

            <button
              class="button is-primary is-small"
              id="searchSelectedFoodsBtn"
              type="button">
              ${t("modal.search")}
            </button>

            <button
              class="button modal-close-btn is-dark is-small"
              type="button">
              ${t("modal.close")}
            </button>
          </div>
        </footer>
      </div>
    </div>
  `;
}

// Modal дотор food list-ийг checkbox хэлбэрээр гаргах
export function renderModalFoodList(foods) {
  return `
    <div class="content">
      ${foods
        .map((food) => {
          const safeFoodCode = escapeHtml(food.food_code);
          const safeFoodName = escapeHtml(getLocalizedValue(food.food_name));

          return `
            <label class="checkbox is-block mb-2 app-sublist-item">
              <input
                type="checkbox"
                class="overview-food-checkbox"
                value="${safeFoodCode}"
                data-foodname="${safeFoodName}"
              />
              <span>${safeFoodName}</span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}

// Аймгийн онцлог хүнсний мэдээлэл (төв, товч тайлбар, гол хүнс)
export function renderProvinceInfo(info) {
  if (!info) return "";

  const center = escapeHtml(getLocalizedValue(info.center));
  const summary = escapeHtml(getLocalizedValue(info.summary));
  const tags = (info.foods || [])
    .map((food) => `<span class="tag is-success is-light is-medium province-food-tag">${escapeHtml(getLocalizedValue(food))}</span>`)
    .join("");

  return `
    <div class="province-info">
      <p class="province-center"><strong>${t("modal.center")}:</strong> ${center}</p>
      <p class="province-summary">${summary}</p>
      <p class="province-subtitle">${t("modal.mainFoods")}</p>
      <div class="tags province-foods">${tags}</div>
    </div>
  `;
}

// Modal нээх
export function openModal({ title, content }) {
  const modal = document.getElementById("infoModal");
  const titleEl = document.getElementById("modalTitle");
  const contentEl = document.getElementById("modalContent");

  if (!modal || !titleEl || !contentEl) return;

  titleEl.textContent = title;
  contentEl.innerHTML = content;
  modal.classList.add("is-active");
  // count reset
  setTimeout(() => {
    updateSelectedCount();
  }, 0);
}

// Modal хаах
export function closeModal() {
  const modal = document.getElementById("infoModal");
  if (modal) {
    modal.classList.remove("is-active");
  }
}

// Modal-ийн event-үүдийг холбоно
export function bindModalEvents() {
  const modal = document.getElementById("infoModal");
  if (!modal) return;

  const bg = modal.querySelector(".modal-background");
  const deleteBtn = modal.querySelector(".delete");
  const closeBtn = modal.querySelector(".modal-close-btn");
  const selectAllBtn = modal.querySelector("#selectAllFoodsBtn");
  const searchSelectedBtn = modal.querySelector("#searchSelectedFoodsBtn");
  const clearBtn = modal.querySelector("#clearFoodsBtn");
  const countEl = modal.querySelector("#selectedCount");

  bg?.addEventListener("click", closeModal);
  deleteBtn?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);

  // checkbox өөрчлөгдөх үед count update
  modal.addEventListener("change", (e) => {
    if (!e.target.classList.contains("overview-food-checkbox")) return;

    updateSelectedCount();
  });

  // Clear all checkboxes
  clearBtn?.addEventListener("click", () => {
    document.querySelectorAll(".overview-food-checkbox").forEach((checkbox) => {
      checkbox.checked = false;
    });
    updateSelectedCount();
  });
  // Select all checkboxes
  selectAllBtn?.addEventListener("click", () => {
    document.querySelectorAll(".overview-food-checkbox").forEach((checkbox) => {
      checkbox.checked = true;
    });
    updateSelectedCount();
  });

  // Update selected count text
  function updateSelectedCount() {
    const count = document.querySelectorAll(".overview-food-checkbox:checked").length;

    const el = document.getElementById("selectedCount");
    if (el) {
      el.textContent = `${count} ${t("modal.selected")}`;
    }
  }
  // Search selected foods
  searchSelectedBtn?.addEventListener("click", () => {
    const checkedFoods = Array.from(document.querySelectorAll(".overview-food-checkbox:checked")).map((input) => ({
      food_code: input.value,
      food_name: input.dataset.foodname,
    }));

    if (!checkedFoods.length) {
      alert("Please select at least one food.");
      return;
    }

    sessionStorage.setItem("pendingSelectedFoods", JSON.stringify(checkedFoods));

    closeModal();
    window.location.hash = "#/search";
  });
}
