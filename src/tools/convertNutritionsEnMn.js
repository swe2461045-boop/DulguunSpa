const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./src/data/nutritions.json", "utf8"));

const foodGroupMnMap = {
  "Cereals and Cereal products": "Үр тариа ба үр тариан бүтээгдэхүүн",
  "Starchy Roots and Starch products": "Цардуулт үндэс ба цардуулан бүтээгдэхүүн",
  Pulses: "Буурцагт ургамал",
  "Nuts and Seeds": "Самар ба үр",
  Vegetables: "Хүнсний ногоо",
  Fruits: "Жимс",
  "Meat and Meat products": "Мах ба махан бүтээгдэхүүн",
  Eggs: "Өндөг",
  "Fish and Fish products": "Загас ба загасан бүтээгдэхүүн",
  "Milk and Milk products": "Сүү ба сүүн бүтээгдэхүүн",
  "Oils and Fats": "Тос ба өөх тос",
  Seasonings: "Амтлагч",
  "Prepared foods": "Бэлэн хоол",
};

const provinceMnMap = {
  Uvs: "Увс",
  "Bayan-Ulgii": "Баян-Өлгий",
  Khovd: "Ховд",
  Zavkhan: "Завхан",
  "Govi-Altai": "Говь-Алтай",
  Arkhangai: "Архангай",
  Uvurkhangai: "Өвөрхангай",
  Bulgan: "Булган",
  Orkhon: "Орхон",
  Khuvsgul: "Хөвсгөл",
  Tuv: "Төв",
  Selenge: "Сэлэнгэ",
  "Darkhan-Uul": "Дархан-Уул",
  Khentii: "Хэнтий",
  Dornod: "Дорнод",
  Sukhbaatar: "Сүхбаатар",
  Dornogovi: "Дорноговь",
  Dundgovi: "Дундговь",
  Umnugovi: "Өмнөговь",
  Bayankhongor: "Баянхонгор",
  Ulaanbaatar: "Улаанбаатар",
};

const collectionAreaMnMap = {
  "Uvs province, Uvs food JSC": "Увс аймаг, Увс хүнс ХК",
  "Khuvsgul province, Altan duulga JSC": "Хөвсгөл аймаг, Алтан дуулга ХК",
  "Ulaanbaatar city, Talkh chikher LC": "Улаанбаатар хот, Талх чихэр ХК",
  "Ulaanbaatar city, Green industry LLC": "Улаанбаатар хот, Грийн индастри ХХК",
  "Ulaanbaatar city, Monfood land LLC": "Улаанбаатар хот, Монфүүд ланд ХХК",
  "Darkhan-Uul province, Plant Protection and Research Institute": "Дархан-Уул аймаг, Ургамал хамгаалал эрдэм шинжилгээний хүрээлэн",
  "Darkhan-Uul province, Ulaanbaatar flour mill JSC": "Дархан-Уул аймаг, Улаанбаатар гурил ХК",
  "Ulaanbaatar city, Gatsuurt LLC": "Улаанбаатар хот, Гацуурт ХХК",
  "Ulaanbaatar city, Taivanzul LLC": "Улаанбаатар хот, Тайванзул ХХК",
  "Ulaanbaatar city, Nord Road LLC": "Улаанбаатар хот, Норд Роуд ХХК",
  "Ulaanbaatar city, Green house LLC": "Улаанбаатар хот, Green house ХХК",
  "Darkhan-Uul province, Rashaant 61": "Дархан-Уул аймаг, Рашаант 61",
  "Selenge province, Zuunburen": "Сэлэнгэ аймаг, Зүүнбүрэн сум",
  "Darkhan-Uul province, Arshaantiin 18 LLC": "Дархан-Уул аймаг, Аршаантын 18 ХХК",
  "Tuv province, Enkhiin Shim LLC": "Төв аймаг, Энхийн шим ХХК",
  "Selenge province, Gatsuurt LLC": "Сэлэнгэ аймаг, Гацуурт ХХК",
  "Selenge province, Mandal": "Сэлэнгэ аймаг, Мандал сум",
  "Tuv province, Atryn Shim LLC": "Төв аймаг, Атрын шим ХХК",
  "Arkhangai province": "Архангай аймаг",
  "Uvurkhangai province": "Өвөрхангай аймаг",
  "Khovd province, Bulgan": "Ховд аймаг, Булган сум",
  "Tuv province, Batsumber village, Rashaant 61": "Төв аймаг, Батсүмбэр сум, Рашаант 61",
  "Selenge province, Khuder": "Сэлэнгэ аймаг, Хүдэр сум",
  "Khentii province, Binder": "Хэнтий аймаг, Биндэр сум",
  "Khentii province": "Хэнтий аймаг",
  "Khuvsgul province, Tsagaan-Uul": "Хөвсгөл аймаг, Цагаан-Уул сум",
  "Dornogovi province": "Дорноговь аймаг",
  "Dornod province, Bayantumen": "Дорнод аймаг, Баянтүмэн",
  "Khuvsgul province, Tsagaan nuur": "Хөвсгөл аймаг, Цагааннуур сум",
  "Dundgovi province": "Дундговь аймаг",
  "Arkhangai province, Bulgan": "Архангай аймаг, Булган сум",
  "Umnugovi province": "Өмнөговь аймаг",
  "Ulaanbaatar city, Tumen shuvuut LC": "Улаанбаатар хот, Түмэн шувуут ХК",
  "Khuvsgul province": "Хөвсгөл аймаг",
  "Khuvsgul province, Ulaan-Uul": "Хөвсгөл аймаг, Улаан-Уул сум",
  "Umnugovi province, Mandalgovi": "Өмнөговь аймаг, Мандалговь сум",
  "Dundgovi province, Delgertsogt": "Дундговь аймаг, Дэлгэрцогт сум",
  "Ulaanbaatar city, Suu LC": "Улаанбаатар хот, Сүү ХК",
  "Khuvsgul province, Renchinlkhumbe": "Хөвсгөл аймаг, Рэнчинлхүмбэ сум",
  "Ulaanbaatar city": "Улаанбаатар хот",
};

const basisMnMap = {
  "Culture and customs": "Соёл ба зан заншил",
  "Commonly consumed food": "Түгээмэл хэрэглэдэг хүнс",
  Biodiversity: "Биологийн олон янз байдал",
  "Exported food": "Экспортын хүнс",
  "Delicate vegetables": "Нарийн ногоо",
};

const additionalInfoMnMap = {
  "Product name: Fiber barley  flour": "Бүтээгдэхүүний нэр: Эслэгтэй арвайн гурил",
  "Product name: Pearled barley flour,  Rousted barley flour": "Бүтээгдэхүүний нэр: Хальсалсан арвайн гурил, Шарсан арвайн гурил",
  "Product name: Talkh chikher, Misheel brand, Rye bread": "Бүтээгдэхүүний нэр: Талх чихэр, Мишээл брэнд, Хөх тарианы талх",
  "Product name: Talkh chikher, Atar brand, wheat bread": "Бүтээгдэхүүний нэр: Талх чихэр, Атар брэнд, Улаанбуудайн талх",
  "Product name: Talkh chikher, Special brand, Multi-seeded crop, fortified multigrain":
    "Бүтээгдэхүүний нэр: Талх чихэр, Спешиал брэнд, олон үртэй баяжуулсан үр тарианы бүтээгдэхүүн",
  "Product name: Lapsha, Ribbon noodle with multigrain flour": "Бүтээгдэхүүний нэр: Лапша, олон үрийн гурилтай хавтгай гоймон",
  "Product name: Oat flour": "Бүтээгдэхүүний нэр: Овьёосны гурил",
  "Product name: Ulaanbaatar flour,  First grade wheat flour": "Бүтээгдэхүүний нэр: Улаанбаатар гурил, Нэгдүгээр гурил",
  "Product name: Ulaanbaatar flour,  Premium grade wheat flour": "Бүтээгдэхүүний нэр: Улаанбаатар гурил, Дээд гурил",
  "Product name: Altan duulga flour,  whole wheat flour": "Бүтээгдэхүүний нэр: Алтан дуулга гурил, Бүхэл үрийн гурил",
  "Product name: Tungalag, vermicelli": "Бүтээгдэхүүний нэр: Тунгалаг, вермишель",
  "Product name: Flax flour": "Бүтээгдэхүүний нэр: Маалингын гурил",
  "Product name: Flax seeds": "Бүтээгдэхүүний нэр: Маалингын үр",
  "Product name: Hushkhan pine nut seeds": "Бүтээгдэхүүний нэр: Хушхан самрын үр",
  "Product name: Hushkhan pine nut": "Бүтээгдэхүүний нэр: Хушхан самар",
  "Product name: Seabuckthorn condenced jiuce": "Бүтээгдэхүүний нэр: Чацарганы өтгөрүүлсэн шүүс",
  "Product name: Tumen shuvuut,  Egg": "Бүтээгдэхүүний нэр: Түмэн шувуут, Өндөг",
  "Product name: Duuren, canned fish": "Бүтээгдэхүүний нэр: Дүүрэн, лаазалсан загас",
  "Product name: Seabuckthorn pulp oil": "Бүтээгдэхүүний нэр: Чацарганы зөөлөн эдийн тос",
  "Product name: Seabuckthorn seed oil": "Бүтээгдэхүүний нэр: Чацарганы үрийн тос",
};

const discardedPartMnMap = {
  "outer peel, root piece": "Гадна хальс, үндэсний хэсэг",
  "outer shell": "Гадна хальс",
  "root piece": "Үндэсний хэсэг",
  "cabbage core, outer peel": "Байцааны гол, гадна хальс",
  "root piece/stem, leaves": "Үндэсний хэсэг/иш, навч",
  "stem ": "Иш",
  Peel: "Хальс",
  "stem and seeds": "Иш ба үр",
  "Peel and seeds": "Хальс ба үр",
  "leaves, stem, seeds": "Навч, иш, үр",
  seeds: "Үр",
  stem: "Иш",
  "outer peel, seeds": "Гадна хальс, үр",
  "outer peel": "Гадна хальс",
  "stem, seed": "Иш, үр",
  leaves: "Навч",
  "bones, visible firm and some soft connective tissues": "Яс, харагдах хатуу болон зөөлөн холбогч эд",
  "Head, skin and tail, fins": "Толгой, арьс, сүүл, сэрвээ",
};

const cookingMethodMnMap = {
  "direct use, toast. Rye is prepared from a  pure, naturally fermented culture. That is why it has a unique and pleasant taste and smell of rye. Rye bread is contains in various minerals, fiber and E, PP, B vitamins.":
    "Шууд хэрэглэж эсвэл шарж хэрэглэнэ. Хөх тариаг цэвэр, байгалийн аргаар исгэсэн хөрөнгөөр бэлтгэдэг. Иймээс өвөрмөц сайхан амт үнэртэй байдаг. Хөх тарианы талх нь төрөл бүрийн эрдэс бодис, эслэг болон Е, PP, B витаминаар баялаг.",

  "direct use, toast. A unique product that has not been changed for 30 years, a unique fragrance and flavor that is considered to be the best for consumers.":
    "Шууд хэрэглэж эсвэл шарж хэрэглэнэ. 30 жилийн турш өөрчлөгдөөгүй, хэрэглэгчдийн хамгийн сайн гэж үнэлдэг өвөрмөц үнэр амттай бүтээгдэхүүн.",

  "direct use, toast. Contains rye flour, sunflower seeds, culture, sesame seeds, hercules. This product improves intestinal motility. Therefore, it is more suitablefor people who are overweight or who are maintaining weight.":
    "Шууд хэрэглэж эсвэл шарж хэрэглэнэ. Хөх тарианы гурил, наранцэцгийн үр, хөрөнгө, кунжутын үр, геркулес агуулсан. Энэхүү бүтээгдэхүүн нь гэдэсний хөдөлгөөнийг сайжруулдаг тул илүүдэл жинтэй эсвэл жингээ барьж буй хүмүүст илүү тохиромжтой.",

  "Boil for 7 to 9 minutes in hot boiling water. After cooking, soak in cold water and drainthrough colander. Prepared noodles can be used for any kind of meals.":
    "Буцалж буй халуун усанд 7–9 минут чанана. Болгосны дараа хүйтэн усанд сойж шүүж хэрэглэнэ. Бэлэн болсон гоймонг төрөл бүрийн хоолонд ашиглаж болно.",

  "boiling, bake, fry in oil": "Чанах, жигнэх, тосонд шарах",

  "wash in water and use, drying powder": "Усаар угааж хэрэглэх, хатааж нунтаглах",

  "boiling, bake, fry in oil, pickling": "Чанах, жигнэх, тосонд шарах, даршлах",

  "boiling, fry in oil, bake": "Чанах, тосонд шарах, жигнэх",

  "wash in water and use": "Усаар угааж хэрэглэнэ.",

  "boiling, bake, fry in oil, pickling, direct use": "Чанах, жигнэх, тосонд шарах, даршлах, шууд хэрэглэнэ.",

  "boiling, fry in oil": "Чанах, тосонд шарна.",
};

const OtherCookingConditionsMnMap = {
  "Remark: People allergic to gluten protein from grains, take note.":
    "Анхааруулга: Үр тарианы глютен уурагт харшилтай хүмүүс анхаарна уу.",

  "Remark: Check whether storage conditions is proper before use6 People who has allergy from the ingredient must it by suitable amount.":
    "Анхааруулга: Хэрэглэхийн өмнө хадгалалтын нөхцөл зөв эсэхийг шалгана уу. Найрлаганд харшилтай хүмүүс тохирох хэмжээгээр хэрэглэнэ үү.",
};

const ReferenceForConditionSettingMnMap = {
  "Store for 48 hour at nom higher than 15*C-18*C with relative humidity nk more than 70% in a cool dry place away from sunlight":
    "Нарны шууд тусгалаас хол, сэрүүн хуурай газар 15°C–18°C-ээс дээшгүй температурт, агаарын харьцангуй чийгшил 70%-иас ихгүй нөхцөлд 48 цаг хадгална.",

  "Store for 72 hour at nom higher than 15*C-18*C with relative humidity nk more than 70% in a cool dry place away from sunlight":
    "Нарны шууд тусгалаас хол, сэрүүн хуурай газар 15°C–18°C-ээс дээшгүй температурт, агаарын харьцангуй чийгшил 70%-иас ихгүй нөхцөлд 72 цаг хадгална.",

  "Store for 12 months at nom higher than 30*C with relative humidity nk more than 70%":
    "30°C-ээс дээшгүй температурт, агаарын харьцангуй чийгшил 70%-иас ихгүй нөхцөлд 12 сар хадгална.",

  "Store the product for 1 year at a temperature of up to 15*C in a place with relative air humidity not higher than 60%. Must be stored at pest-free, odor-free, cool and dry environment.":
    "Бүтээгдэхүүнийг 15°C-ээс дээшгүй температурт, агаарын харьцангуй чийгшил 60%-иас ихгүй нөхцөлд 1 жил хадгална. Хортон шавьжгүй, үнэргүй, сэрүүн хуурай орчинд хадгалах шаардлагатай.",

  "Store for 1 year at with in a cool dry place away from sunlig.": "Нарны шууд тусгалаас хол, сэрүүн хуурай газар 1 жил хадгална.",

  "Store broccoli in the refrigerator for up to 5 days. Broccoli can be blanched and frozen for up to one year.":
    "Брокколиг хөргөгчинд 5 хүртэл хоног хадгална. Брокколиг бага зэрэг чанаж хөлдөөвөл 1 жил хүртэл хадгалах боломжтой.",

  "Store in fridge for 2-3 weeks": "Хөргөгчинд 2–3 долоо хоног хадгална.",

  "Store for 3-12 months at nom  -18*C with relative humidity nk more than 90-95%":
    "-18°C температурт, агаарын харьцангуй чийгшил 90–95% нөхцөлд 3–12 сар хадгална.",
};

function toLangObject(enValue, mnValue = "") {
  return {
    en: enValue || "",
    mn: mnValue || "",
  };
}

const output = data.map((item) => {
  const collectionInfo = item.collection_information || {};
  const ediblePart = item.edible_inedible_part || {};
  const pretreatment = item.pretreatment_conditions || {};

  const collectionArea = collectionInfo["Collection area"];
  const basis = collectionInfo["Basis of sample selection"];
  const additionalInfo = collectionInfo["Additional collection information"];

  return {
    food_code: item.food_code,
    food_group: toLangObject(item.food_group, foodGroupMnMap[item.food_group]),
    food_name: toLangObject(item.food_name, item.native_name),
    scientific_name: item.scientific_name,
    province: toLangObject(item.province, provinceMnMap[item.province]),
    proximates: item.proximates,
    minerals: item.minerals,
    vitamins: item.vitamins,
    collection_information: {
      "Collection area": toLangObject(collectionArea, collectionAreaMnMap[collectionArea]),
      "Collection date": collectionInfo["Collection date"],
      "Basis of sample selection": toLangObject(basis, basisMnMap[basis]),
      "Additional collection information": toLangObject(additionalInfo, additionalInfoMnMap[additionalInfo]),
    },
    edible_inedible_part: {
      "Weight of whole part (g/1 piece)": ediblePart["Weight of whole part (g/1 piece)"],
      "Weight of edible part (g/1 piece)": ediblePart["Weight of edible part (g/1 piece)"],
      "Inedible part (discarded part)": toLangObject(
        ediblePart["Inedible part (discarded part)"],
        discardedPartMnMap[ediblePart["Inedible part (discarded part)"]],
      ),
      "Weight of inedible part (g/1 piece)": ediblePart["Weight of inedible part (g/1 piece)"],
    },
    pretreatment_conditions: {
      "Cooking (processing) method": toLangObject(
        pretreatment["Cooking (processing) method"],
        cookingMethodMnMap[pretreatment["Cooking (processing) method"]],
      ),
      "Other cooking (processing) conditions": toLangObject(
        pretreatment["Other cooking (processing) conditions"],
        OtherCookingConditionsMnMap[pretreatment["Other cooking (processing) conditions"]],
      ),

      "Reference for condition setting": toLangObject(
        pretreatment["Reference for condition setting"],
        ReferenceForConditionSettingMnMap[pretreatment["Reference for condition setting"]],
      ),
    },
  };
});

fs.writeFileSync("./src/data/nutritionsEnMn.json", JSON.stringify(output, null, 2), "utf8");

console.log("Амжилттай хөрвүүллээ!");
