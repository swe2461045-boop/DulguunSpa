export function getBooks() {
  return [
    {
      cover: "./img/books/book-agri-wheat.svg",
      alt: "Guidelines for The Mongolian Food Composition",
      pdf: "./pdf/SOP_Mongolia_V2_No_Blanks.pdf",
      description: {
        en: "In Mongolia, the first “Food composition table” was established and published in 1997. It contains information for the following eight groups of products. It includes: Meat and meat products; Milk and dairy products; Cereals and their products; Vegetables; Fruits and their products; Fat, oils; Sugar contents products; Alcoholic. In the first FCT, a total of 12 nutrients of protein, fat, carbohydrates, fiber, ash, and vitamins A, C, E, Ca, K, Na, and Fe are covered in 288 products of the above eight groups. It was managed by the Ministry of Food, agriculture, and Light Industry. The FCT is available in hard copy. It contains few types of foods and has not been updated for more than 20 years.",
        mn: "Монгол Улсад анхны “Хүнсний найрлагын хүснэгт” (Food Composition Table, FCT) 1997 онд боловсруулагдан хэвлэгдсэн бөгөөд мах, махан бүтээгдэхүүн, сүү, сүүн бүтээгдэхүүн, үр тариа болон түүний бүтээгдэхүүн, хүнсний ногоо, жимс жимсгэнэ болон тэдгээрийн бүтээгдэхүүн, өөх тос, тосон бүтээгдэхүүн, элсэн чихэр агуулсан бүтээгдэхүүн, согтууруулах ундаа гэсэн найман бүлгийн бүтээгдэхүүний мэдээллийг багтаасан байдаг. Энэхүү анхны хүснэгтэд дээрх найман бүлгийн нийт 288 төрлийн хүнсний бүтээгдэхүүний уураг, өөх тос, нүүрс ус, эслэг, үнс, А, С, Е аминдэм, кальци (Ca), кали (K), натри (Na), төмөр (Fe) зэрэг нийт 12 төрлийн шимт бодисын агууламжийг хамруулсан байна. Хүснэгтийг Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яам хариуцан боловсруулж, хэвлэмэл хэлбэрээр ашиглах боломжтой болгосон. Гэвч энэхүү хүнсний найрлагын хүснэгт нь цөөн төрлийн хүнсийг хамарсан бөгөөд 20 гаруй жилийн хугацаанд шинэчлэгдээгүй байна.",
      },
    },
    {
      cover: "./img/books/book-agri-vegetables.svg",
      alt: "Food Composition Table for Mongolia",
      pdf: "./pdf/FoodCompositionTableForMongolia20240520.pdf",
      description: {
        en: "This new edition of the Mongolia food composition table is based on a systematic data management process and international standards and guidelines for food composition. Food composition data from various Mongolian University of Life Science and research institutes of SAMO in Mongolia were collected and compiled. In addition …… were analyzed fiber, fatty acid, and amino acid composition. Food composition data from other sources (Korean FCT and scientific literature) were used to supplement missing values. The FCT contains 108 foods and 14 mandatory components. Most of the data are raw foods. Two cooked foods and recipes were calculated by using yield factors from Islam et al (2012) and Rahim et al (2013) and retention factors from Eurofir (Vasquez-Caicedo et al., 2008). The FST is divided in a main table (containing values on proximates, minerals, and vitamins) and several annex tables for amino acids, and fatty acids. Moreover, this edition contains protein values based on food-specific nitrogen-to-protein conversion factors instead of a general factor of 6.25, and emphasis was given to include values for total dietary fiber.",
        mn: "Монгол Улсын Хүнсний найрлагын хүснэгтийн энэхүү шинэ хэвлэл нь хүнсний найрлагын мэдээллийг боловсруулах олон улсын стандарт, удирдамж болон өгөгдлийн системтэй менежментийн үйл явцад тулгуурлан боловсруулагдсан болно. Монгол Улсын Хөдөө аж ахуйн их сургууль болон Шинжлэх ухааны академийн харьяа судалгааны байгууллагуудаас гаргасан хүнсний найрлагын мэдээллийг цуглуулж, нэгтгэн боловсруулсан. Үүнээс гадна эслэг, тосны хүчил болон амин хүчлийн найрлагад шинжилгээ хийсэн. Дутуу мэдээллийг нөхөх зорилгоор БНСУ-ын Хүнсний найрлагын хүснэгт болон эрдэм шинжилгээний бүтээлүүдээс авсан мэдээллийг ашигласан. Энэхүү хүнсний найрлагын хүснэгтэд 108 нэр төрлийн хүнс болон зайлшгүй шаардлагатай 14 үзүүлэлтийг багтаасан бөгөөд ихэнх мэдээлэл нь түүхий хүнсний бүтээгдэхүүнд хамаарна. Мөн хоёр төрлийн болгосон хүнс болон жорын шимт найрлагыг Islam нарын (2012), Rahim нарын (2013) судалгаанд дурдсан гарцын коэффициент (yield factor), EuroFIR-ийн хадгалалтын коэффициент (retention factor)-ийг (Vasquez-Caicedo нар, 2008) ашиглан тооцоолсон. Хүнсний найрлагын хүснэгт нь үндсэн хүснэгт болон хавсралт хүснэгтүүдээс бүрдэх бөгөөд үндсэн хүснэгтэд үндсэн шимт бодисууд, эрдэс бодис, аминдэмийн агууламжийг, харин хавсралт хүснэгтүүдэд амин хүчил болон тосны хүчлийн найрлагын мэдээллийг тус тус оруулсан. Түүнчлэн энэхүү хэвлэлд уургийн агууламжийг тооцоолохдоо нийтлэг хэрэглэгддэг 6.25 коэффициентийн оронд хүнс тус бүрийн азот-уургийн хөрвүүлэх тусгай коэффициентийг ашигласан бөгөөд нийт хүнсний эслэгийн агууламжийн мэдээллийг багтаахад онцгой анхаарал хандуулсан болно.",
      },
    },
    {
      cover: "./img/books/book-agri-livestock.svg",
      alt: "Mongolian Traditional Food EN",
      pdf: "./pdf/foodbook-en.pdf",
      description: {
        en: "Mongolia is a landlocked country located in the central part of Asia, between 41°–52° northern latitude and 87°-119° eastern longitude. In terms of land area, it ranks 19th in the world and 7th in Asia. The average elevation of Mongolia is 1,580 meters above sea level, with the highest point reaching 4,374 meters, in dicating its mountainous terrain. Mongolia shares its southern border with China and its northern border with Russia. As a result, the country’s traditional food culture has been slightly influenced by the culinary traditions of its neighbouring countries.",
        mn: "Монгол улс нь хойд өргөргийн 41°-52°, зүүн уртрагийн 87°-119°-ийн хооронд Ази тивийн төв хэсэгт хуурай газарт оршдог. Газар нутгийн хэмжээгээр дэлхийд 19, Ази тивд 7 дугаарт ордог. Монгол орон нь далайн түвшнөөс дээш дунджаар 1580 м, хамгийн өндөр цэг нь 4374 м байгаа нь уулархаг өндөр болохыг харуулж байна. Монгол улс нь урд талаараа БНХАУ-тай, хойд хэсгээр ОХУ-тай хиллэдэг. Иймд Монголын уламжлалт хоолны соёлд хөрш орнуудын хооллох соёл бага зэрэг нутагшсан байдаг.",
      },
    },
    {
      cover: "./img/books/book-agri-dairy.svg",
      alt: "Mongolian Traditional Food MN",
      pdf: "./pdf/foodbook-mn.pdf",
      description: {
        en: "Mongolia is a landlocked country located in the central part of Asia, between 41°–52° northern latitude and 87°-119° eastern longitude. In terms of land area, it ranks 19th in the world and 7th in Asia. The average elevation of Mongolia is 1,580 meters above sea level, with the highest point reaching 4,374 meters, in dicating its mountainous terrain. Mongolia shares its southern border with China and its northern border with Russia. As a result, the country’s traditional food culture has been slightly influenced by the culinary traditions of its neighbouring countries.",
        mn: "Монгол улс нь хойд өргөргийн 41°-52°, зүүн уртрагийн 87°-119°-ийн хооронд Ази тивийн төв хэсэгт хуурай газарт оршдог. Газар нутгийн хэмжээгээр дэлхийд 19, Ази тивд 7 дугаарт ордог. Монгол орон нь далайн түвшнөөс дээш дунджаар 1580 м, хамгийн өндөр цэг нь 4374 м байгаа нь уулархаг өндөр болохыг харуулж байна. Монгол улс нь урд талаараа БНХАУ-тай, хойд хэсгээр ОХУ-тай хиллэдэг. Иймд Монголын уламжлалт хоолны соёлд хөрш орнуудын хооллох соёл бага зэрэг нутагшсан байдаг.",
      },
    },
  ];
}
