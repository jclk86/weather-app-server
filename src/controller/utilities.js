const coordinates = require("../assets/zip-codes-to-geo-coords.json");

exports.checkIfNums = (str) => {
  return /^\d+$/.test(str);
};

exports.findCoordinates = (zipcode) => {
  return coordinates[zipcode];
};
