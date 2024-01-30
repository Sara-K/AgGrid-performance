const fs = require("fs");

// Define arrays with sample data for randomization
const athletes = [
  "Michael Phelps",
  "Natalie Coughlin",
  "Aleksey Nemov",
  "Alicia Coutts",
  "Missy Franklin",
  "Ryan Lochte",
  "Allison Schmitt",
];
const countries = [
  "United States",
  "Russia",
  "Australia",
  "China",
  "Germany",
  "Canada",
  "Great Britain",
  "France",
];
const sports = [
  "Swimming",
  "Gymnastics",
  "Athletics",
  "Cycling",
  "Diving",
  "Speed Skating",
  "Cross Country Skiing",
];
const years = [2000, 2004, 2008, 2012];

// Random helper functions
const randomInt = (from, to) =>
  Math.floor(Math.random() * (to - from + 1) + from);
const randomItem = (items) => items[randomInt(0, items.length - 1)];
const randomDate = (year) =>
  `${randomInt(1, 28).toString().padStart(2, "0")}/${randomInt(1, 12)
    .toString()
    .padStart(2, "0")}/${year}`;

// Generate a single random entry
const generateRandomEntry = () => {
  const year = randomItem(years);
  return {
    athlete: randomItem(athletes),
    age: randomInt(18, 35),
    country: randomItem(countries),
    year: year,
    date: randomDate(year),
    sport: randomItem(sports),
    gold: randomInt(0, 5),
    silver: randomInt(0, 5),
    bronze: randomInt(0, 5),
    total: null, // Calculate later based on gold, silver, bronze
  };
};

// Populate the array with random data, ensuring unique total medal counts
const populateWithRandomData = (originalEntries, targetCount) => {
  const entries = [...originalEntries];
  while (entries.length < targetCount) {
    const newEntry = generateRandomEntry();
    newEntry.total = newEntry.gold + newEntry.silver + newEntry.bronze;
    entries.push(newEntry);
  }
  return entries;
};

// Generate random data and write to the file
const populatedData = populateWithRandomData([], 10000);
fs.writeFileSync("populatedData.json", JSON.stringify(populatedData, null, 2));

console.log("Data has been generated and written to populatedData.json.");
