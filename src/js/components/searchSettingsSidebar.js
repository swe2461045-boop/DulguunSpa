import { escapeHtml } from "../fn/format.js";
import { t } from "../i18n/i18n.js";

export const nutritionGroups = [
  {
    groupName: "sidebar.nutritions",
    items: [
      { value: "proximates", label: "sidebar.proximates", checked: true },
      { value: "minerals", label: "sidebar.minerals", checked: true },
      { value: "vitamins", label: "sidebar.vitamins", checked: true },
    ],
  },
  {
    groupName: "sidebar.sampleInformations",
    items: [
      { value: "collection_information", label: "sidebar.collection_information", checked: false },
      { value: "edible_inedible_part", label: "sidebar.edible_inedible_part", checked: false },
      { value: "pretreatment_conditions", label: "sidebar.pretreatment_conditions", checked: false },
      { value: "description", label: "sidebar.description", checked: false },
      { value: "images", label: "sidebar.images", checked: false },
    ],
  },
];

function renderNutritionGroup(group) {
  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button">
        <span>${escapeHtml(t(group.groupName))}</span>
      </a>

      <ul class="app-sublist is-hidden">
        ${group.items
          .map(
            (item) => `
              <li>
                <label class="app-sublist-item">
                  <input type="checkbox" name="nutrition" value="${escapeHtml(item.value)}" ${item.checked ? "checked" : ""}>
                  <span>${escapeHtml(t(item.label))}</span>
                </label>
              </li>
            `,
          )
          .join("")}
      </ul>
    </li>
  `;
}

export function renderSearchSettings() {
  return `
    <p class="menu-label app-menu-label">🛠 ${t("sidebar.searchSettings")}:</p>

    <ul class="menu-list">
      ${nutritionGroups.map(renderNutritionGroup).join("")}
    </ul>
  `;
}
