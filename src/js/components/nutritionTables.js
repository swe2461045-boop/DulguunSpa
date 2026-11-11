import { titleFromKey, escapeHtml } from "../fn/format.js";
import { renderTable } from "../layouts/tableLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { getImagesByFoodCode } from "../services/imageService.js";
import { getLocalizedValue, formatDate, t } from "../i18n/i18n.js";

/* Хайлтын үр дүнгийн хүснэгтийг харуулах хэсэг
items = хайгаад олсон хүнсний найрлагын json өгөгдөл
selectedTypes = ["proximates", "minerals", "vitamins" ...] */
export function renderNutritionTables(items, selectedTypes) {
  // Хайлтын үр дүн олдохгүй бол анхааруулах мессеж харуулна.
  if (!items.length) {
    return renderNotification(t("notification.noMatchFound"));
  }

  // Ямар нэгэн шим тэжээлийн төрлийг сонгоогүй бол анхааруулах мессеж харуулна.
  if (!selectedTypes.length) {
    return renderNotification(t("notification.selectAtLeastOneCategory"));
  }

  // Сонгосон шим тэжээлийн төрлүүдээр хүснэгт үүсгэнэ. proximates, minerals, vitamins ...
  return selectedTypes.map((type) => renderTableByType(type, items)).join("");
}

/* items = хайгаад олсон хүнсний найрлагын (json) өгөгдлүүдийг
type = Сонгосон шим тэжээлийн төрлүүдээр (proximates, minerals, vitamins ...) хүснэгт үүсгэнэ. */
function renderTableByType(type, items) {
  // description сонгосон бол тайлбар харуулах хүснэгт үүсгэнэ. Учир нь талбарууд өөр.
  if (type === "description") {
    return renderTable({
      title: t("table.description"),
      columns: [
        { key: "food_name", label: t("table.foodName") },
        { key: "food_group", label: t("table.foodGroup") },
        { key: "scientific_name", label: t("table.scientificName") },
        { key: "province", label: t("table.province") },
      ],
      rows: items.map((item) => ({
        ...item,
        food_name: getLocalizedValue(item.food_name),
        food_group: getLocalizedValue(item.food_group),
        province: getLocalizedValue(item.province),
      })),
    });
  }

  // images сонгосон бол зураг харуулах хүснэгт үүсгэнэ. Учир нь талбарууд өөр. Food name:"Barley flour, whole grain", Number of Images: "4"
  if (type === "images") {
    return renderTable({
      title: t("table.images"),
      columns: [
        {
          key: "food_name",
          label: t("table.foodName"),
        },
        {
          key: "number_of_images",
          label: t("table.numberOfImages"),
          render: (item) => {
            const images = getImagesByFoodCode(item.food_code);
            const count = images.length;

            return count > 0
              ? `
                <span
                  class="tag is-primary image-count-tag open-image-btn"
                  data-foodcode="${escapeHtml(item.food_code)}"
                  data-foodname="${escapeHtml(getLocalizedValue(item.food_name))}"
                >
                  ${count}
                </span>
              `
              : "-";
          },
        },
      ],
      rows: items.map((item) => ({
        ...item,
        food_name: getLocalizedValue(item.food_name),
      })),
    });
  }

  /* items дотор байгаа JSON өгөгдлөөс
    1. тухайн type (proximates, minerals, vitamins гэх мэт)-ийн бүх key-үүдийг цуглуулах,
    2. түүгээр хүснэгтийн columns үүсгэх, 
    3. дараа нь мөр (rows) үүсгэх */

  /* 1. Бүх item дотор байгаа nutrients-ийн бүх key-үүдийг давхардалгүйгээр цуглуулж байна. Үүнд:
        items.flatMap(...) бол бүх item-ийн key-үүдийг нэг array болгоно. new Set(...) бол давхардлыг арилгана. 
        type = "vitamins" бол ["Vitamin A (μg)", "Thiamin (mg)", "Riboflavin (mg)", "Vitamin C (mg)", "Refuse (%)"] */

  const nutrientKeys = Array.from(
    new Set(
      items.flatMap((item) => {
        const data = item?.[type]; // type = "vitamins" бол item["vitamins"] болно. {"Vitamin A (μg)": 1, "Thiamin (mg)": 0.28, "Riboflavin (mg)": 0.11, "Vitamin C (mg)": 22.95, "Refuse (%)": 0.0}

        return data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : []; // Object.keys(data) бол key-үүдийг array болгож авна. ["Vitamin A (μg)", "Thiamin (mg)", "Riboflavin (mg)", "Vitamin C (mg)", "Refuse (%)"]
      }),
    ),
  );

  /* 2. Тухайн type-ийн бүх key-үүдээр хүснэгтийн columns үүсгэх талбарууд. Үүнд:
        [
          { key: "food_name", label: "Food name" },

          { key: "Vitamin A (μg)", label: "Vitamin A (μg)" },
          { key: "Thiamin (mg)", label: "Thiamin (mg)" },
        ] */

  const columns = [
    { key: "food_name", label: t("table.foodName") },

    ...nutrientKeys.map((key) => ({
      key,
      label:
        t(`table.${key}`) !== `table.${key}`
          ? t(`table.${key}`)
          : t(`nutrients.${key}`) !== `nutrients.${key}`
            ? t(`nutrients.${key}`)
            : key,
    })),
  ];

  /* 3. Мөр (rows) үүсгэх өгөгдөл Үүнд:
        [
          {
            food_name: "Barley flour, whole grain",
            "Vitamin A (μg)": 1,
            "Thiamin (mg)": 0.28,
          },
          {
            food_name: "Barley flour, whole grain, pearled",
            "Vitamin A (μg)": 1,
            "Thiamin (mg)": 0.421,
          },
        ]
   */

  const rows = items.map((item) => {
    const rowData = getLocalizedValue(item?.[type] && typeof item[type] === "object" ? item[type] : {});

    if (rowData["Collection date"]) {
      rowData["Collection date"] = formatDate(rowData["Collection date"]);
    }

    return {
      food_name: getLocalizedValue(item.food_name),
      ...rowData,
    };
  });

  return renderTable({
    title: t(`sidebar.${type}`) !== `sidebar.${type}` ? t(`sidebar.${type}`) : titleFromKey(type),
    columns,
    rows,
  });
}

/* renderTable({
  title: "Vitamins",

  columns: [
    { key: "food_name", label: "Food name" },
     
    { key: "Vitamin A (μg)", label: "Vitamin A (μg)" },
    { key: "Thiamin (mg)", label: "Thiamin (mg)" },
  ],

  rows: [
    {
      food_name: "Barley flour, whole grain",
      "Vitamin A (μg)": 1,
      "Thiamin (mg)": 0.28,
    },
    {
      food_name: "Barley flour, whole grain, pearled",
      "Vitamin A (μg)": 1,
      "Thiamin (mg)": 0.421,
    },
  ],
}); */
