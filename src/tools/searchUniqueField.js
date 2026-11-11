const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./src/data/nutritions.json", "utf8"));
const uniqueFields = [...new Set(data.map((item) => item.collection_information["Collection area"]))];
console.log(uniqueFields);
