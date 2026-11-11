import { t } from "../i18n/i18n.js";

export function mountFooter(root) {
  root.innerHTML = `
    <footer class="footer app-footer">
      <div class="container">
        <div class="columns is-multiline is-centered">

          <div class="column is-12-mobile is-6-tablet is-4-desktop">
            <div class="content">
              <h3 class="title is-5">${t("footer.teamMembers")}</h3>
              <ul>
                <li>
                  <img src="./img/icon/afaci.png" alt="AFACI" style="height: 1em; vertical-align: middle; margin-right: 5px;">
                  <a class="custom-link" href="https://rda.go.kr/afaci/site/project/view?pageId=02020401&pageName=APPT#submenu02020401" target="_blank">${t("footer.afaci")}</a>
                </li>
                <li>
                  <img src="./img/icon/muls.png" alt="MULS" style="height: 1em; vertical-align: middle; margin-right: 5px;">
                  <a class="custom-link" href="https://muls.edu.mn" target="_blank">${t("footer.muls")}</a>
                </li>
                <li>
                  <img src="./img/icon/rda.png" alt="RDA" style="height: 1em; vertical-align: middle; margin-right: 5px;">
                  <a class="custom-link" href="https://www.rda.go.kr/foreign/ten2/" target="_blank">${t("footer.rda")}</a>
                </li>
                <li>
                  <img src="./img/icon/mfali.png" alt="MOFA" style="height: 1em; vertical-align: middle; margin-right: 5px;">
                  <a class="custom-link" href="https://www.mofa.gov.mn" target="_blank">${t("footer.mfali")}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="column is-12-mobile is-6-tablet is-4-desktop">
            <div class="content">
              <h3 class="title is-5">${t("footer.coreMembers")}</h3>
              <ul >
                <li><i class="fas fa-user-tie fa-fw" style="margin-right: 6px;"></i> ${t("footer.projectInvestigators")}</li>
                <li><i class="fas fa-flask fa-fw" style="margin-right: 6px;"></i> ${t("footer.researchers")}</li>
                <li><i class="fas fa-users fa-fw" style="margin-right: 6px;"></i> ${t("footer.others")}</li>
                <li><i class="fas fa-laptop-code fa-fw" style="margin-right: 6px;"></i> ${t("footer.softwareDeveloper")}</li>

              </ul>
            </div>
          </div>

          <div class="column is-12-mobile is-6-tablet is-4-desktop">
            <div class="content">
              <h3 class="title is-5">${t("footer.contactInformation")}</h3>
                <ul>
                  <li><i class="fas fa-university fa-fw" style="margin-right: 6px;"></i> ${t("footer.university")}</li>
                  <li><i class="fas fa-map-marker-alt fa-fw" style="margin-right: 6px;"></i> ${t("footer.address")}</li>
                  <li><i class="fas fa-phone fa-fw" style="margin-right: 6px;"></i> ${t("footer.phone")}: (+976)-95044450</li>
                  <li><i class="fas fa-envelope fa-fw" style="margin-right: 6px;"></i> ${t("footer.email")}: <a class="custom-link" href="mailto:swe2461077@muls.edu.mn">swe2461077@muls.edu.mn</a></li>
                </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  `;
}
