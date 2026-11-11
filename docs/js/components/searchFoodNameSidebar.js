import { t } from "../i18n/i18n.js";
//  Үг бичиж хайх
export function renderSearchFoodName() {
  return `    
    <!-- Үг бичиж хайх -->
    <p class="menu-label app-menu-label">🔍︎ ${t("sidebar.searchByFoodName")}:</p>

    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-primary" type="text" placeholder="${t("sidebar.foodName")}" id="searchTxt"/>
        <span class="icon is-small is-left">
          <i class="fa-solid fa-bowl-rice"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <p class="control">
        <button class="button is-primary is-fullwidth" type="button" id="searchBtn">
          ${t("sidebar.searchButton")}
        </button>
      </p>
    </div>   
  `;
}
