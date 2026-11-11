let txt = null;

export async function loadTxt() {
  if (txt) return txt;

  const response = await fetch("./data/txt.json");

  if (!response.ok) {
    throw new Error("Failed to load txt.json");
  }

  txt = await response.json();
  return txt;
}

export function getTxt(lang, key) {
  return txt?.[lang]?.[key] || txt?.en?.[key] || "";
}
