import { translations } from "./translations.js";

/* Апп эхлэхэд ашиглах үндсэн хэл. 
   localStorage-д хэл хадгалагдаагүй бол энэ хэл ашиглагдана. */
const DEFAULT_LANGUAGE = "mn";

/* Одоогоор сонгогдсон хэлийг авна.
   localStorage-д хадгалсан хэл байвал тэрийг, байхгүй бол DEFAULT_LANGUAGE буцаана.
   Жишээ:
   localStorage -> "en"  => "en"
   localStorage хоосон => "mn"
*/
export function getCurrentLanguage() {
  return localStorage.getItem("language") || DEFAULT_LANGUAGE;
}

/* Хэрэглэгчийн сонгосон хэлийг localStorage-д хадгална.
   Жишээ: setLanguage("en")
*/
export function setLanguage(language) {
  localStorage.setItem("language", language);
}

/* translation объект дотроос текст хайж авна.

   path:
   "nav.search"
   "overview.title"

   Ажиллах зарчим:
   translations["mn"]["nav"]["search"]

   Жишээ:
   t("nav.search")
   => "Хайлт"

   Хэрэв translation байхгүй бол path өөрийг нь буцаана.
   Жишээ:
   t("abc.xyz")
   => "abc.xyz"
*/
export function t(path) {
  const language = getCurrentLanguage();
  const keys = path.split(".");

  let value = translations[language];

  for (const key of keys) {
    value = value?.[key];
  }

  return value ?? path;
}

/* Хэлийг MN <-> EN хооронд сольж хадгална.

   mn -> en
   en -> mn

   Жишээ: toggleLanguage()
   "mn" байсан бол "en"
   "en" байсан бол "mn"
*/
export function toggleLanguage() {
  const current = getCurrentLanguage();
  const next = current === "mn" ? "en" : "mn";
  setLanguage(next);
  return next;
}

/* { en, mn } бүтэцтэй өгөгдлөөс
   одоогийн хэлний утгыг автоматаар авах helper function.

   Хуучин бүтэц болон шинэ бүтэц хоёуланг дэмжинэ.

   Шинэ бүтэц:
   {
      en:"Barley flour",
      mn:"Арвайн гурил"
   }

   Хуучин бүтэц:
   "Barley flour"

   fallback:
   утга байхгүй үед буцаах нөөц утга.
*/
export function getLocalizedValue(value, fallback = "") {
  const language = getCurrentLanguage();

  if (value == null) return fallback;

  if (typeof value === "object" && !Array.isArray(value)) {
    // {en,mn} бүтэц
    if ("en" in value || "mn" in value) {
      return value[language] || value.en || value.mn || fallback;
    }

    // Энгийн object бол бүх value-г давтаж хөрвүүлэх
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, getLocalizedValue(val, fallback)]));
  }

  return value;
}

/* formatDate() 
25.11.2021
2021.11.25
05.10.2021
2021-11-25
аль алийг нь таньдаг. */
export function formatDate(dateString) {
  if (!dateString) return "";

  const language = getCurrentLanguage();

  let day, month, year;

  const parts = dateString.split(/[.-]/);

  if (parts.length !== 3) {
    return dateString;
  }

  // yyyy.mm.dd
  if (parts[0].length === 4) {
    [year, month, day] = parts;
  }

  // dd.mm.yyyy
  else if (parts[2].length === 4) {
    [day, month, year] = parts;
  } else {
    return dateString;
  }

  // 01 padding
  day = String(day).padStart(2, "0");
  month = String(month).padStart(2, "0");

  // Монгол формат
  if (language === "mn") {
    return `${year}.${month}.${day}`;
  }

  // Англи формат
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
