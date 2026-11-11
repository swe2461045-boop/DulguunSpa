import { escapeHtml } from "../fn/format.js";
import { t, getLocalizedValue } from "../i18n/i18n.js";

import {
  getFoodCode,
  getFoodName,
  getEnergy,
  getProtein,
  getFat,
  getCarbohydrate,
  getCalcium,
  getIron,
  getPhosphorus,
  getVitaminC,
} from "../fn/nutrientGetters.js";

import {
  getNutrientRequirements,
  getRequirementByAgeGender,
  getRequirementAgeOptions,
  getAgeLabel,
  getAgeObject,
} from "../services/nutrientRequirementService.js";

import { renderCalculationInfo } from "../components/calculationInfo.js";

import { renderTable } from "../layouts/tableLayout.js";

function formatPercent(intake, requirement) {
  if (!requirement || requirement <= 0) return "";
  return `${((intake / requirement) * 100).toFixed(2)}%`;
}

function findFoodByCode(nutritionData, code) {
  return nutritionData.find((food) => food.food_code === code);
}

function collectTotals(container = document) {
  const totals = {
    amount: 0,
    energy: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    calcium: 0,
    iron: 0,
    phosphorus: 0,
    vitaminC: 0,
  };

  container.querySelectorAll(".amount-input").forEach((input) => {
    const amount = Number(input.value) || 0;

    totals.amount += amount;
    totals.energy += ((Number(input.dataset.energy) || 0) * amount) / 100;
    totals.protein += ((Number(input.dataset.protein) || 0) * amount) / 100;
    totals.fat += ((Number(input.dataset.fat) || 0) * amount) / 100;
    totals.carbohydrate += ((Number(input.dataset.carbohydrate) || 0) * amount) / 100;
    totals.calcium += ((Number(input.dataset.calcium) || 0) * amount) / 100;
    totals.iron += ((Number(input.dataset.iron) || 0) * amount) / 100;
    totals.phosphorus += ((Number(input.dataset.phosphorus) || 0) * amount) / 100;
    totals.vitaminC += ((Number(input.dataset.vitaminc) || 0) * amount) / 100;
  });

  return totals;
}

function renderAgeOptions(ageOptions = [], selectedAge = "") {
  return `
    <option value="" ${!selectedAge ? "selected" : ""} disabled>
      ${t("form.age")}
    </option>

    ${ageOptions
      .map(
        (age) => `
          <option value="${escapeHtml(age.value)}" ${selectedAge === age.value ? "selected" : ""}>
            ${escapeHtml(getAgeLabel(age.label))}
          </option>
        `,
      )
      .join("")}
  `;
}

function renderGenderOptions(selectedGender = "") {
  return `
    <option value="" ${!selectedGender ? "selected" : ""} disabled>
      ${t("form.gender")}
    </option>

    <option value="male" ${selectedGender === "male" ? "selected" : ""}>
      ${t("form.male")}
    </option>

    <option value="female" ${selectedGender === "female" ? "selected" : ""}>
      ${t("form.female")}
    </option>
  `;
}

function renderMacroRow(food) {
  const code = getFoodCode(food);
  const name = getFoodName(food);

  const energy = getEnergy(food);
  const protein = getProtein(food);
  const fat = getFat(food);
  const carbohydrate = getCarbohydrate(food);

  const calcium = getCalcium(food);
  const iron = getIron(food);
  const phosphorus = getPhosphorus(food);
  const vitaminC = getVitaminC(food);

  return `
    <tr>
      <td>${escapeHtml(name)}</td>

      <td>
        <input
          id="amount-${escapeHtml(code)}"
          class="input is-small amount-input"
          type="number"
          min="0"
          step="0.01"
          value="100"
          data-energy="${energy}"
          data-protein="${protein}"
          data-fat="${fat}"
          data-carbohydrate="${carbohydrate}"
          data-calcium="${calcium}"
          data-iron="${iron}"
          data-phosphorus="${phosphorus}"
          data-vitaminc="${vitaminC}"
        />
      </td>

      <td id="energy-${escapeHtml(code)}" class="has-text-right">${energy.toFixed(2)}</td>
      <td id="protein-${escapeHtml(code)}" class="has-text-right">${protein.toFixed(2)}</td>
      <td id="fat-${escapeHtml(code)}" class="has-text-right">${fat.toFixed(2)}</td>
      <td id="carbohydrate-${escapeHtml(code)}" class="has-text-right">${carbohydrate.toFixed(2)}</td>

      <td class="has-text-centered">
        <button
          type="button"
          class="button is-small is-danger is-light remove-row-btn"
          data-code="${escapeHtml(code)}"
        >
          ×
        </button>
      </td>
    </tr>
  `;
}

function renderMicroRow(food) {
  const code = getFoodCode(food);
  const name = getFoodName(food);

  return `
    <tr>
      <td>${escapeHtml(name)}</td>
      <td id="micro-amount-${escapeHtml(code)}" class="has-text-right">100.00</td>
      <td id="calcium-${escapeHtml(code)}" class="has-text-right">${getCalcium(food).toFixed(2)}</td>
      <td id="iron-${escapeHtml(code)}" class="has-text-right">${getIron(food).toFixed(2)}</td>
      <td id="phosphorus-${escapeHtml(code)}" class="has-text-right">${getPhosphorus(food).toFixed(2)}</td>
      <td id="vitaminc-${escapeHtml(code)}" class="has-text-right">${getVitaminC(food).toFixed(2)}</td>

      <td class="has-text-centered">
        <button
          type="button"
          class="button is-small is-danger is-light remove-row-btn"
          data-code="${escapeHtml(code)}"
        >
          ×
        </button>
      </td>
    </tr>
  `;
}

function renderMacrosTable(selectedFoods = [], ageOptions = [], selectedAge = "", selectedGender = "") {
  return renderTable({
    title: t("calculation.macroTitle"),
    rows: selectedFoods,
    columns: [
      {
        label: t("table.foodName"),
        render: (food) => escapeHtml(getFoodName(food)),
      },
      {
        label: `${t("calculation.amount")} (g)`,
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));

          return `
            <input
              id="amount-${code}"
              class="input is-small amount-input"
              type="number"
              min="0"
              step="0.01"
              value="100"
              data-energy="${getEnergy(food)}"
              data-protein="${getProtein(food)}"
              data-fat="${getFat(food)}"
              data-carbohydrate="${getCarbohydrate(food)}"
              data-calcium="${getCalcium(food)}"
              data-iron="${getIron(food)}"
              data-phosphorus="${getPhosphorus(food)}"
              data-vitaminc="${getVitaminC(food)}"
            />
          `;
        },
      },
      {
        label: t("nutrients.Energy (kcal)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="energy-${code}">${getEnergy(food).toFixed(2)}</span>`;
        },
      },
      {
        label: t("nutrients.Protein (g)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="protein-${code}">${getProtein(food).toFixed(2)}</span>`;
        },
      },
      {
        label: t("nutrients.Fat (g)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="fat-${code}">${getFat(food).toFixed(2)}</span>`;
        },
      },
      {
        label: t("nutrients.Carbohydrate (g)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="carbohydrate-${code}">${getCarbohydrate(food).toFixed(2)}</span>`;
        },
      },
      {
        label: "",
        tdClass: "has-text-centered",
        render: (food) => `
          <button
            type="button"
            class="button is-small is-danger is-light remove-row-btn"
            data-code="${escapeHtml(getFoodCode(food))}"
          >
            ×
          </button>
        `,
      },
    ],
    footer: `
      <tr class="has-background-light has-text-weight-semibold">
        <td>${t("calculation.total")}</td>
        <td id="total-amount" class="has-text-right">0.00</td>
        <td id="total-energy" class="has-text-right">0.00</td>
        <td id="total-protein" class="has-text-right">0.00</td>
        <td id="total-fat" class="has-text-right">0.00</td>
        <td id="total-carbohydrate" class="has-text-right">0.00</td>
        <td></td>
      </tr>

      <tr class="has-text-weight-semibold">
        <td>
          <div class="select is-small is-fullwidth">
            <select id="requirement-age">
              ${renderAgeOptions(ageOptions, selectedAge)}
            </select>
          </div>
        </td>

        <td>
          <div class="select is-small is-fullwidth">
            <select id="requirement-gender">
              ${renderGenderOptions(selectedGender)}
            </select>
          </div>
        </td>

        <td id="req-energy" class="has-text-right"></td>
        <td id="req-protein" class="has-text-right"></td>
        <td id="req-fat" class="has-text-right"></td>
        <td id="req-carbohydrate" class="has-text-right"></td>
        <td></td>
      </tr>

      <tr>
        <td colspan="2" class="has-text-centered has-text-weight-semibold">
          ${t("calculation.percentRequirement")}
        </td>
        <td id="percent-energy" class="has-text-right"></td>
        <td id="percent-protein" class="has-text-right"></td>
        <td id="percent-fat" class="has-text-right"></td>
        <td id="percent-carbohydrate" class="has-text-right"></td>
        <td></td>
      </tr>
    `,
  });
}

function renderMicrosTable(selectedFoods = []) {
  return renderTable({
    title: t("calculation.microTitle"),
    rows: selectedFoods,
    columns: [
      {
        label: t("table.foodName"),
        render: (food) => escapeHtml(getFoodName(food)),
      },
      {
        label: `${t("calculation.amount")} (g)`,
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="micro-amount-${code}">100.00</span>`;
        },
      },
      {
        label: t("nutrients.Calcium (mg)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="calcium-${code}">${getCalcium(food).toFixed(2)}</span>`;
        },
      },
      {
        label: t("nutrients.Iron (mg)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="iron-${code}">${getIron(food).toFixed(2)}</span>`;
        },
      },
      {
        label: t("nutrients.Phosphorus (mg)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="phosphorus-${code}">${getPhosphorus(food).toFixed(2)}</span>`;
        },
      },
      {
        label: t("nutrients.Vitamin C (mg)"),
        thClass: "has-text-right",
        tdClass: "has-text-right",
        render: (food) => {
          const code = escapeHtml(getFoodCode(food));
          return `<span id="vitaminc-${code}">${getVitaminC(food).toFixed(2)}</span>`;
        },
      },
      {
        label: "",
        tdClass: "has-text-centered",
        render: (food) => `
          <button
            type="button"
            class="button is-small is-danger is-light remove-row-btn"
            data-code="${escapeHtml(getFoodCode(food))}"
          >
            ×
          </button>
        `,
      },
    ],
    footer: `
      <tr class="has-background-light has-text-weight-semibold">
        <td>${t("calculation.total")}</td>
        <td id="micro-total-amount" class="has-text-right">0.00</td>
        <td id="total-calcium" class="has-text-right">0.00</td>
        <td id="total-iron" class="has-text-right">0.00</td>
        <td id="total-phosphorus" class="has-text-right">0.00</td>
        <td id="total-vitamin-c" class="has-text-right">0.00</td>
        <td></td>
      </tr>

      <tr class="has-text-weight-semibold">
        <td id="selected-age-micro"></td>
        <td id="selected-gender-micro"></td>
        <td id="req-calcium" class="has-text-right"></td>
        <td id="req-iron" class="has-text-right"></td>
        <td id="req-phosphorus" class="has-text-right"></td>
        <td id="req-vitamin-c" class="has-text-right"></td>
        <td></td>
      </tr>

      <tr>
        <td colspan="2" class="has-text-centered has-text-weight-semibold">
          ${t("calculation.percentRequirement")}
        </td>
        <td id="percent-calcium" class="has-text-right"></td>
        <td id="percent-iron" class="has-text-right"></td>
        <td id="percent-phosphorus" class="has-text-right"></td>
        <td id="percent-vitamin-c" class="has-text-right"></td>
        <td></td>
      </tr>
    `,
  });
}

export function renderCalculationTable(selectedFoods = [], ageOptions = [], selectedAge = "", selectedGender = "") {
  if (!selectedFoods.length) return renderCalculationInfo();
  return `
    <div id="calculationTableWrap" class="mt-4">
      ${renderMacrosTable(selectedFoods, ageOptions, selectedAge, selectedGender)}
      ${renderMicrosTable(selectedFoods)}
    </div>
  `;
}

function updateRowValues(code) {
  const input = document.getElementById(`amount-${code}`);
  if (!input) return;

  const amount = Number(input.value) || 0;

  const energy = ((Number(input.dataset.energy) || 0) * amount) / 100;
  const protein = ((Number(input.dataset.protein) || 0) * amount) / 100;
  const fat = ((Number(input.dataset.fat) || 0) * amount) / 100;
  const carbohydrate = ((Number(input.dataset.carbohydrate) || 0) * amount) / 100;

  const calcium = ((Number(input.dataset.calcium) || 0) * amount) / 100;
  const iron = ((Number(input.dataset.iron) || 0) * amount) / 100;
  const phosphorus = ((Number(input.dataset.phosphorus) || 0) * amount) / 100;
  const vitaminC = ((Number(input.dataset.vitaminc) || 0) * amount) / 100;

  document.getElementById(`energy-${code}`)?.replaceChildren(energy.toFixed(2));
  document.getElementById(`protein-${code}`)?.replaceChildren(protein.toFixed(2));
  document.getElementById(`fat-${code}`)?.replaceChildren(fat.toFixed(2));
  document.getElementById(`carbohydrate-${code}`)?.replaceChildren(carbohydrate.toFixed(2));

  document.getElementById(`micro-amount-${code}`)?.replaceChildren(amount.toFixed(2));
  document.getElementById(`calcium-${code}`)?.replaceChildren(calcium.toFixed(2));
  document.getElementById(`iron-${code}`)?.replaceChildren(iron.toFixed(2));
  document.getElementById(`phosphorus-${code}`)?.replaceChildren(phosphorus.toFixed(2));
  document.getElementById(`vitaminc-${code}`)?.replaceChildren(vitaminC.toFixed(2));
}

export function updateTotals(container = document) {
  const totals = collectTotals(container);

  const setText = (selector, value) => {
    const el = container.querySelector(selector);
    if (el) el.textContent = value;
  };

  setText("#total-amount", totals.amount.toFixed(2));
  setText("#total-energy", totals.energy.toFixed(2));
  setText("#total-protein", totals.protein.toFixed(2));
  setText("#total-fat", totals.fat.toFixed(2));
  setText("#total-carbohydrate", totals.carbohydrate.toFixed(2));

  setText("#micro-total-amount", totals.amount.toFixed(2));
  setText("#total-calcium", totals.calcium.toFixed(2));
  setText("#total-iron", totals.iron.toFixed(2));
  setText("#total-phosphorus", totals.phosphorus.toFixed(2));
  setText("#total-vitamin-c", totals.vitaminC.toFixed(2));
}

function getGenderLabel(gender) {
  if (gender === "male") return t("form.male");
  if (gender === "female") return t("form.female");
  return "";
}

export async function updateRequirementSummary(container = document) {
  const age = container.querySelector("#requirement-age")?.value || "";
  const gender = container.querySelector("#requirement-gender")?.value || "";

  const totals = collectTotals(container);

  const setText = (selector, value) => {
    const el = container.querySelector(selector);
    if (el) el.textContent = value;
  };

  const clearRequirementFields = () => {
    [
      "#selected-age-micro",
      "#selected-gender-micro",

      "#req-energy",
      "#req-protein",
      "#req-fat",
      "#req-carbohydrate",

      "#req-calcium",
      "#req-iron",
      "#req-phosphorus",
      "#req-vitamin-c",

      "#percent-energy",
      "#percent-protein",
      "#percent-fat",
      "#percent-carbohydrate",

      "#percent-calcium",
      "#percent-iron",
      "#percent-phosphorus",
      "#percent-vitamin-c",
    ].forEach((selector) => setText(selector, ""));
  };

  if (!age || !gender) {
    clearRequirementFields();
    return;
  }

  const requirement = await getRequirementByAgeGender(age, gender);

  const reqEnergy = Number(requirement?.proximates?.["Energy (kcal)"] ?? 0);
  const reqProtein = Number(requirement?.proximates?.["Protein (g)"] ?? 0);
  const reqFat = Number(requirement?.proximates?.["Fat (g)"] ?? 0);
  const reqCarbohydrate = Number(requirement?.proximates?.["Carbohydrate (g)"] ?? 0);

  const reqCalcium = Number(requirement?.minerals?.["Calcium (mg)"] ?? 0);
  const reqIron = Number(requirement?.minerals?.["Iron (mg)"] ?? 0);
  const reqPhosphorus = Number(requirement?.minerals?.["Phosphorus (mg)"] ?? 0);
  const reqVitaminC = Number(requirement?.vitamins?.["Vitamin C (mg)"] ?? 0);

  const ageObject = await getAgeObject(age);
  setText("#selected-age-micro", typeof ageObject === "object" ? getLocalizedValue(ageObject) : ageObject);

  setText("#selected-gender-micro", getGenderLabel(gender));

  setText("#req-energy", reqEnergy.toFixed(2));
  setText("#req-protein", reqProtein.toFixed(2));
  setText("#req-fat", reqFat.toFixed(2));
  setText("#req-carbohydrate", reqCarbohydrate.toFixed(2));

  setText("#req-calcium", reqCalcium.toFixed(2));
  setText("#req-iron", reqIron.toFixed(2));
  setText("#req-phosphorus", reqPhosphorus.toFixed(2));
  setText("#req-vitamin-c", reqVitaminC.toFixed(2));

  setText("#percent-energy", formatPercent(totals.energy, reqEnergy));
  setText("#percent-protein", formatPercent(totals.protein, reqProtein));
  setText("#percent-fat", formatPercent(totals.fat, reqFat));
  setText("#percent-carbohydrate", formatPercent(totals.carbohydrate, reqCarbohydrate));

  setText("#percent-calcium", formatPercent(totals.calcium, reqCalcium));
  setText("#percent-iron", formatPercent(totals.iron, reqIron));
  setText("#percent-phosphorus", formatPercent(totals.phosphorus, reqPhosphorus));
  setText("#percent-vitamin-c", formatPercent(totals.vitaminC, reqVitaminC));
}

function bindRequirementEvents(container) {
  container.querySelector("#requirement-age")?.addEventListener("change", async () => {
    await updateRequirementSummary(container);
  });

  container.querySelector("#requirement-gender")?.addEventListener("change", async () => {
    await updateRequirementSummary(container);
  });
}

function bindAmountEvents(container) {
  container.querySelectorAll(".amount-input").forEach((input) => {
    input.addEventListener("input", async () => {
      const code = input.id.replace("amount-", "");

      updateRowValues(code);
      updateTotals(container);
      await updateRequirementSummary(container);
    });
  });
}

function bindRemoveEvents(container, nutritionData) {
  container.querySelectorAll(".remove-row-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.code;
      const checkbox = document.querySelector(`input[name="foodcode"][value="${code}"]`);

      if (checkbox) checkbox.checked = false;

      await refreshCalculationTable(nutritionData);
    });
  });
}

export async function refreshCalculationTable(nutritionData) {
  const checkedCodes = [...document.querySelectorAll('input[name="foodcode"]:checked')].map((el) => el.value);

  const selectedFoods = checkedCodes.map((code) => findFoodByCode(nutritionData, code)).filter(Boolean);

  const resultBox = document.getElementById("resultCalculatedTbl");
  if (!resultBox) return;

  const currentAge = resultBox.querySelector("#requirement-age")?.value || "";
  const currentGender = resultBox.querySelector("#requirement-gender")?.value || "";

  const infoHtml = renderCalculationInfo();
  const ageOptions = await getRequirementAgeOptions();

  resultBox.innerHTML = selectedFoods.length
    ? renderCalculationTable(selectedFoods, ageOptions, currentAge, currentGender)
    : renderCalculationInfo();

  bindAmountEvents(resultBox);
  bindRemoveEvents(resultBox, nutritionData);
  bindRequirementEvents(resultBox);

  updateTotals(resultBox);
  await updateRequirementSummary(resultBox);
}

export async function preloadNutrientRequirements() {
  await getNutrientRequirements();
}
