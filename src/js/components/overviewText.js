// Танилцуулгын текст хэсгийг дүрслэх

import { getTxt } from "../services/txtService.js";

export function renderOverviewText(lang = "en") {
  return ` 
    <div class="app-overview-text">   
      <p class="app-txt">
        ${getTxt(lang, "overviewText")}
      </p>
    </div> 
  `;
}
