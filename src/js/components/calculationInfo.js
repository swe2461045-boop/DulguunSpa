import { renderNotification } from "../layouts/notificationLayout.js";
import { t } from "../i18n/i18n.js";

// Хүнс тооцоолох хуудасны мэдээллийн хэсэг
export function renderCalculationInfo() {
  return `
    ${renderNotification(t("calculation.selectedAmount"), "info")}
    ${renderNotification(t("calculation.dailyRequirement"), "warning")}
  `;
}
