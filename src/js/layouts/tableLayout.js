import { safeValue } from "../fn/format.js";
import { renderNotification } from "./notificationLayout.js";

export function renderTable({ title = "", columns = [], rows = [], emptyMessage = "No data available." }) {
  return `
    <div class="table-container app-tbl">
      ${
        title
          ? `
            <h2 class="subtitle app-subtitle">
              ${safeValue(title)}
            </h2>                       
          `
          : ""
      }

      ${
        rows.length
          ? `
            <table class="table is-striped is-bordered is-hoverable is-fullwidth">
              <thead>
                <tr>
                  ${columns.map((col) => `<th>${safeValue(col.label)}</th>`).join("")}
                </tr>
              </thead>

              <tbody>
                ${rows
                  .map(
                    (row) => `
                      <tr>
                        ${columns.map((col) => `<td>${safeValue(row[col.key])}</td>`).join("")}
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          `
          : renderNotification(safeValue(emptyMessage))
      }
    </div>
    <br>
  `;
}
